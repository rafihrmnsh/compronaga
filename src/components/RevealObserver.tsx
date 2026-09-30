"use client";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Menandai elemen [data-reveal] dengan data-in saat masuk viewport.
export default function RevealObserver() {
  const path = usePathname();
  useLayoutEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach((e) => (e.dataset.in = "1")); return; }
    els.forEach((e) => { if (e.getBoundingClientRect().top < innerHeight * 0.95) e.dataset.in = "1"; });
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { (en.target as HTMLElement).dataset.in = "1"; io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.filter((e) => !e.dataset.in).forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
