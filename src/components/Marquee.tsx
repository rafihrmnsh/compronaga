import type { Client } from "@/data/content";

function Pill({ c }: { c: Client }) {
  return (
    <div className="spot mr-3 flex w-72 shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-brand-600 hover:shadow-md">
      <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-sm font-extrabold text-gold-400">
        {c.name.replace(/^PT\.?\s*/i, "").charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-semibold text-navy-900">{c.name}</span>
        {c.place && <span className="block truncate text-xs text-slate-600">{c.place}</span>}
      </span>
    </div>
  );
}

// Dua baris berjalan berlawanan arah, berhenti saat hover. Daftar teks untuk pembaca layar ada di sr-only.
export default function Marquee({ clients }: { clients: Client[] }) {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];
  return (
    <>
      <ul className="sr-only">{clients.map((c) => <li key={c.name}>{c.name}{c.place ? `, ${c.place}` : ""}</li>)}</ul>
      <div aria-hidden="true" className="space-y-3">
        {rows.map((row, r) => (
          <div key={r} className="marquee py-1">
            <div className={`marquee-track ${r ? "rev" : ""}`}>
              {[...row, ...row, ...row, ...row].map((c, n) => <Pill key={n} c={c} />)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
