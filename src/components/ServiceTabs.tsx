"use client";
import { useRef, useState } from "react";

type Service = { no: string; title: string; desc: string; items: string[] };

// Tab interaktif (pola WAI-ARIA tabs: panah kiri/kanan/atas/bawah, Home, End).
export default function ServiceTabs({ services }: { services: Service[] }) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = services[i];

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let n = i;
    if (e.key in map) n = (i + map[e.key] + services.length) % services.length;
    else if (e.key === "Home") n = 0; else if (e.key === "End") n = services.length - 1; else return;
    e.preventDefault(); setI(n); refs.current[n]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div role="tablist" aria-label="Layanan inti" aria-orientation="vertical" onKeyDown={onKey}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {services.map((sv, n) => (
          <button key={sv.no} ref={(el) => { refs.current[n] = el; }} role="tab" id={`svc-tab-${n}`} aria-selected={i === n} aria-controls="svc-panel"
            tabIndex={i === n ? 0 : -1} onClick={() => setI(n)}
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${i === n
              ? "border-brand-700 bg-brand-700 text-white shadow-lg lg:translate-x-2"
              : "border-slate-200 bg-white text-navy-900 hover:border-brand-600 hover:bg-brand-50"}`}>
            <span className={`text-sm font-extrabold ${i === n ? "text-gold-400" : "text-brand-600"}`}>{sv.no}</span>
            <span className="font-bold leading-tight">{sv.title}</span>
          </button>
        ))}
      </div>

      <div key={i} id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${i}`} tabIndex={0}
        className="anim-rise relative overflow-hidden rounded-2xl bg-navy-900 p-7 text-white shadow-xl sm:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-8 select-none text-[9rem] font-extrabold leading-none text-white/[0.06] sm:text-[12rem]">{s.no}</span>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Layanan {s.no}</p>
        <h3 className="relative mt-2 text-2xl font-extrabold sm:text-3xl">{s.title}</h3>
        {s.desc && <p className="relative mt-4 max-w-xl leading-relaxed text-slate-300">{s.desc}</p>}
        {s.items.length > 0 && (
          <ul className="relative mt-6 flex flex-wrap gap-2.5">
            {s.items.map((it, n) => (
              <li key={it} className="anim-pop rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950" style={{ ["--d" as string]: `${n * 55}ms` }}>
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
