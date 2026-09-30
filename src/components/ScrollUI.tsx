"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Progress bar scroll, parallax hero, tombol kembali ke atas, tombol telepon (mobile),
// serta efek spotlight & tilt via satu listener terdelegasi.
export default function ScrollUI() {
  const bar = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
        setTop(h.scrollTop > 700);
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          if (h.scrollTop < innerHeight * 1.2) el.style.transform = `translate3d(0, ${h.scrollTop * 0.25}px, 0) scale(1.08)`;
        });
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastTilt: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as Element;
      const spot = t.closest<HTMLElement>(".spot");
      if (spot) { const r = spot.getBoundingClientRect(); spot.style.setProperty("--mx", `${e.clientX - r.left}px`); spot.style.setProperty("--my", `${e.clientY - r.top}px`); }
      const tilt = reduce ? null : t.closest<HTMLElement>("[data-tilt]");
      if (lastTilt && lastTilt !== tilt) { lastTilt.style.setProperty("--rx", "0deg"); lastTilt.style.setProperty("--ry", "0deg"); }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`); tilt.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      }
      lastTilt = tilt;
    };
    if (fine) document.addEventListener("pointermove", onMove);
    return () => { removeEventListener("scroll", onScroll); document.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-700 via-brand-600 to-gold-400" />
      </div>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
        <a href={`tel:${site.phoneHref}`} aria-label={`Telepon ${site.phone}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition hover:scale-110 hover:bg-brand-800 lg:hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" /></svg>
        </a>
        <button type="button" aria-label="Kembali ke atas" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} tabIndex={top ? 0 : -1}
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-navy-800 ${top ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      </div>
    </>
  );
}
