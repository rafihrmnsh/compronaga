// Validasi dipakai server (wajib). Client hanya untuk UX.
export type ContactInput = { name: string; email: string; phone: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-\s]{6,20}$/;

export function validateContact(raw: unknown): { ok: true; data: ContactInput } | { ok: false; errors: Record<string, string> } {
  const r = (raw ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data = { name: str(r.name), email: str(r.email), phone: str(r.phone), message: str(r.message) };
  const errors: Record<string, string> = {};
  if (data.name.length < 2 || data.name.length > 100) errors.name = "Nama 2-100 karakter.";
  if (!EMAIL.test(data.email) || data.email.length > 254) errors.email = "Email tidak valid.";
  if (data.phone && !PHONE.test(data.phone)) errors.phone = "Nomor telepon tidak valid.";
  if (data.message.length < 10 || data.message.length > 2000) errors.message = "Pesan 10-2000 karakter.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
