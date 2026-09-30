"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "@/data/content";

// Grid foto + lightbox (dialog native): swipe, panah keyboard, zoom klik, thumbnail, preload tetangga.
export default function Gallery({ images, label, cols = "sm:grid-cols-3 lg:grid-cols-5" }: { images: Img[]; label: string; cols?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [i, setI] = useState<number | null>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const n = images.length;

  const close = useCallback(() => { ref.current?.close(); setI(null); setZoom(null); }, []);
  const go = useCallback((d: number) => { setZoom(null); setI((v) => (v === null ? v : (v + d + n) % n)); }, [n]);

  useEffect(() => { if (i !== null && !ref.current?.open) ref.current?.showModal(); }, [i]);
  useEffect(() => {
    if (i === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    addEventListener("keydown", h);
    return () => removeEventListener("keydown", h);
  }, [i, go]);
  useEffect(() => { // thumbnail aktif selalu terlihat
    strip.current?.querySelector<HTMLElement>('[aria-current="true"]')?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [i]);

  const onDown = (e: React.PointerEvent) => { start.current = { x: e.clientX, y: e.clientY }; };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = start.current; start.current = null; if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 1 : -1); return; }
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) { // klik = toggle zoom
      const r = e.currentTarget.getBoundingClientRect();
      setZoom((z) => (z ? null : { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }));
    }
  };

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 ${cols}`}>
        {images.map((im, k) => (
          <li key={im.src} data-reveal="zoom" style={{ ["--d" as string]: `${(k % 5) * 70}ms` }}>
            <button type="button" onClick={() => setI(k)} aria-label={`Perbesar foto ${k + 1} dari ${n}: ${label}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200 shadow-sm transition-shadow hover:shadow-xl">
              <Image src={im.src} alt={`${label} - foto ${k + 1}`} fill sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75" loading="lazy" />
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={ref} onClose={() => { setI(null); setZoom(null); }} onClick={(e) => e.target === ref.current && close()}
        className="m-auto max-h-[94vh] w-[min(96vw,64rem)] overflow-hidden rounded-xl bg-navy-950 p-0 text-white" aria-label={`Galeri ${label}`}>
        {i !== null && (
          <div className="relative">
            <div onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (start.current = null)}
              className={`touch-pan-y select-none overflow-hidden ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}>
              <Image key={images[i].src} src={images[i].src} alt={`${label} - foto ${i + 1}`} width={images[i].w} height={images[i].h} sizes="96vw" draggable={false}
                style={zoom ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                className="anim-rise mx-auto max-h-[70vh] w-auto object-contain transition-transform duration-300" />
            </div>
            {/* preload tetangga */}
            <div className="sr-only" aria-hidden="true">
              {[(i + 1) % n, (i - 1 + n) % n].map((k) => (
                <Image key={k} src={images[k].src} alt="" width={images[k].w} height={images[k].h} sizes="96vw" loading="eager" />
              ))}
            </div>
            <button type="button" onClick={() => go(-1)} aria-label="Foto sebelumnya" className="absolute left-2 top-[35%] flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-2xl transition hover:scale-110 hover:bg-black/80">‹</button>
            <button type="button" onClick={() => go(1)} aria-label="Foto berikutnya" className="absolute right-2 top-[35%] flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-2xl transition hover:scale-110 hover:bg-black/80">›</button>
            <button type="button" onClick={close} aria-label="Tutup galeri" className="absolute right-2 top-2 h-10 w-10 rounded-full bg-black/60 text-xl transition hover:rotate-90 hover:bg-black/80">×</button>
            <p className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs tabular-nums" aria-live="polite">{i + 1} / {n}</p>
            <div ref={strip} className="flex gap-2 overflow-x-auto p-3" role="group" aria-label="Thumbnail">
              {images.map((im, k) => (
                <button key={im.src} type="button" onClick={() => { setZoom(null); setI(k); }} aria-label={`Foto ${k + 1}`} aria-current={k === i ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition ${k === i ? "ring-2 ring-gold-400" : "opacity-50 hover:opacity-100"}`}>
                  <Image src={im.src} alt="" fill sizes="80px" className="object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
