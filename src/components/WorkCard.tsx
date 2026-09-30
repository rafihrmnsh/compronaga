"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Work } from "@/data/content";

// Kartu: tilt 3D (via data-tilt), dan foto berganti otomatis saat di-hover / fokus.
export default function WorkCard({ work, base }: { work: Work; base: string }) {
  const [hover, setHover] = useState(false);
  const [idx, setIdx] = useState(0);
  const [touched, setTouched] = useState(false); // foto tambahan baru dimuat setelah interaksi pertama
  const n = work.images.length;

  useEffect(() => {
    if (!hover || n < 2) { setIdx(0); return; }
    const t = setInterval(() => setIdx((v) => (v + 1) % n), 1100);
    return () => clearInterval(t);
  }, [hover, n]);

  const on = () => { setTouched(true); setHover(true); setIdx(n > 1 ? 1 : 0); };
  const off = () => setHover(false);

  return (
    <div data-tilt className="h-full">
      <Link href={`${base}/${work.slug}`} onPointerEnter={on} onPointerLeave={off} onFocus={on} onBlur={off}
        className="group spot flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
          {work.images.map((im, k) => (k === 0 || touched) && (
            <Image key={im.src} src={im.src} alt={k === 0 ? `${work.title} - foto utama` : ""} aria-hidden={k === 0 ? undefined : true} fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" loading="lazy"
              className={`object-cover transition-all duration-700 ${idx === k ? "scale-105 opacity-100" : "scale-100 opacity-0"} ${k === 0 && idx !== 0 ? "" : ""}`} />
          ))}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-white tabular-nums">
            {hover && n > 1 ? `${idx + 1}/${n}` : `${n} foto`}
          </span>
          {n > 1 && (
            <span aria-hidden="true" className="absolute inset-x-3 bottom-3 flex gap-1">
              {work.images.map((_, k) => <span key={k} className={`h-1 flex-1 rounded-full transition-colors ${hover && k <= idx ? "bg-gold-400" : "bg-white/0"}`} />)}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-700">{work.title}</h3>
          {work.client && <p className="mt-1 text-sm text-slate-600">{work.client}</p>}
          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-brand-700">
            Lihat dokumentasi <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
