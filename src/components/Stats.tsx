"use client";
import { useEffect, useRef, useState } from "react";

// Angka diambil dari PDF: 30 klien (slide 14-15), 5 layanan inti (slide 5), 8 kapabilitas (slide 6), berdiri 2022.
const STATS = [
  { to: 2022, from: 1990, label: "Tahun berdiri", plain: true },
  { to: 30, from: 0, label: "Klien dalam daftar" },
  { to: 5, from: 0, label: "Layanan inti" },
  { to: 8, from: 0, label: "Kapabilitas" },
];

export default function Stats() {
  const ref = useRef<HTMLUListElement>(null);
  const [v, setV] = useState(STATS.map((s) => s.to)); // nilai akhir dulu agar aman tanpa JS/SEO

  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setV(STATS.map((s) => s.from));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), D = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / D), k = 1 - Math.pow(1 - p, 3);
        setV(STATS.map((s) => Math.round(s.from + (s.to - s.from) * k)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-4">
      {STATS.map((s, n) => (
        <li key={s.label} className="bg-navy-900/80 px-5 py-6 text-center backdrop-blur transition hover:bg-navy-800">
          <p className="text-3xl font-extrabold tabular-nums text-gold-400 sm:text-4xl" aria-label={`${s.to} ${s.label}`}>{v[n]}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-300">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
