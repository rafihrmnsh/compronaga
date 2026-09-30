"use client";
import { useRef, useState } from "react";
import { validateContact } from "@/lib/contact-schema";

type Status = { s: "idle" | "sending" | "ok" | "error"; msg?: string };
const FIELDS = ["name", "email", "phone", "message"] as const;
type F = (typeof FIELDS)[number];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ s: "idle" });
  const [vals, setVals] = useState<Record<F, string>>({ name: "", email: "", phone: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<F, boolean>>>({});
  const [serverErr, setServerErr] = useState<Record<string, string>>({});
  const started = useRef(Date.now());

  const check = validateContact(vals);
  const errs: Record<string, string> = { ...(check.ok ? {} : check.errors), ...serverErr };
  const show = (k: F) => (touched[k] || serverErr[k]) && errs[k];
  const good = (k: F) => touched[k] && !errs[k] && (vals[k] || k === "phone");

  const set = (k: F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVals((v) => ({ ...v, [k]: e.target.value })); setServerErr((x) => { const { [k]: _, ...r } = x; return r; });
  };
  const blur = (k: F) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!check.ok) { document.getElementById(Object.keys(check.errors)[0])?.focus(); return; }
    const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus({ s: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...vals, website: hp, elapsed: Date.now() - started.current }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok) { setVals({ name: "", email: "", phone: "", message: "" }); setTouched({}); setStatus({ s: "ok" }); }
      else { setServerErr(j.errors ?? {}); setStatus({ s: "error", msg: j.error ?? "Gagal mengirim pesan." }); }
    } catch {
      setStatus({ s: "error", msg: "Koneksi bermasalah. Coba lagi atau hubungi kami lewat telepon." });
    }
  }

  if (status.s === "ok") {
    return (
      <div role="status" className="anim-pop flex flex-col items-center rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <svg width="72" height="72" viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="24" stroke="#15803d" strokeWidth="3" />
          <path d="M15 27l8 8 15-17" stroke="#15803d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40" style={{ animation: "draw .6s .2s ease-out forwards" }} />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-green-900">Pesan terkirim</h2>
        <p className="mt-1 text-green-900">Terima kasih. Tim kami akan menghubungi Anda kembali.</p>
        <button type="button" onClick={() => { started.current = Date.now(); setStatus({ s: "idle" }); }} className="mt-5 rounded-md border border-green-700 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-100">Kirim pesan lain</button>
      </div>
    );
  }

  const field = (k: F) => `mt-1 w-full rounded-md border px-3 py-2.5 text-base transition-colors focus:outline-none ${show(k) ? "border-red-600 bg-red-50" : good(k) ? "border-green-600" : "border-slate-300 focus:border-brand-600"}`;
  const Msg = ({ k }: { k: F }) => (show(k) ? <p id={`${k}-err`} className="anim-rise mt-1 text-sm text-red-700">{errs[k]}</p> : null);
  const ad = (k: F) => (show(k) ? `${k}-err` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-semibold">Nama <span className="text-red-700" aria-hidden="true">*</span></label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" value={vals.name} onChange={set("name")} onBlur={blur("name")} className={field("name")} aria-describedby={ad("name")} aria-invalid={!!show("name")} />
        <Msg k="name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-semibold">Email <span className="text-red-700" aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" value={vals.email} onChange={set("email")} onBlur={blur("email")} className={field("email")} aria-describedby={ad("email")} aria-invalid={!!show("email")} />
          <Msg k="email" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold">Telepon</label>
          <input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" value={vals.phone} onChange={set("phone")} onBlur={blur("phone")} className={field("phone")} aria-describedby={ad("phone")} aria-invalid={!!show("phone")} />
          <Msg k="phone" />
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between">
          <label htmlFor="message" className="text-sm font-semibold">Pesan <span className="text-red-700" aria-hidden="true">*</span></label>
          <span className={`text-xs tabular-nums ${vals.message.length > 1900 ? "text-red-700" : "text-slate-500"}`}>{vals.message.length}/2000</span>
        </div>
        <textarea id="message" name="message" rows={6} required maxLength={2000} value={vals.message} onChange={set("message")} onBlur={blur("message")} className={field("message")} aria-describedby={ad("message")} aria-invalid={!!show("message")} />
        <Msg k="message" />
      </div>
      <button type="submit" disabled={status.s === "sending"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800 hover:shadow-lg active:scale-[.98] disabled:opacity-60 sm:w-auto">
        {status.s === "sending" ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />Mengirim…</>) : (<>Kirim Pesan <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></>)}
      </button>
      <p role="status" aria-live="polite" className="text-sm text-red-700">{status.s === "error" ? status.msg : ""}</p>
    </form>
  );
}
