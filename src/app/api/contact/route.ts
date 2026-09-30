import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Rate limit sederhana per IP (in-memory). Di serverless ini best-effort saja;
// untuk produksi serius gunakan Upstash/Vercel KV atau Vercel WAF rate limiting.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60_000, max = 5;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < win);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

async function turnstileOk(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // opsional
  if (typeof token !== "string" || !token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  return ((await r.json()) as { success?: boolean }).success === true;
}

export async function POST(req: Request) {
  // Tolak lintas-origin & payload besar
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (Number(req.headers.get("content-length") ?? 0) > 10_000) return NextResponse.json({ error: "Payload terlalu besar." }, { status: 413 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Terlalu banyak permintaan. Coba lagi nanti." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Format tidak valid." }, { status: 400 }); }

  // Honeypot terisi atau form dikirim < 3 detik: pura-pura sukses agar bot tidak beradaptasi
  if (body.website || (typeof body.elapsed === "number" && body.elapsed < 3000)) return NextResponse.json({ ok: true });

  if (!(await turnstileOk(body.turnstile, ip))) return NextResponse.json({ error: "Verifikasi gagal." }, { status: 400 });

  const v = validateContact(body);
  if (!v.ok) return NextResponse.json({ error: "Periksa kembali isian Anda.", errors: v.errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY belum diset; pesan tidak terkirim.");
    return NextResponse.json({ error: "Layanan form belum aktif. Silakan hubungi kami lewat telepon atau email." }, { status: 503 });
  }
  const { name, email, phone, message } = v.data;
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "NKSI Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "pt.nagakaryasakti@gmail.com"],
      reply_to: email,
      subject: `[Website NKSI] Pesan dari ${clean(name)}`,
      text: `Nama: ${name}\nEmail: ${email}\nTelepon: ${phone || "-"}\n\n${message}`, // teks polos: tanpa HTML injection
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Gagal mengirim pesan. Coba lagi nanti." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
