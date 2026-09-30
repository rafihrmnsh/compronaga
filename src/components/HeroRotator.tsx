"use client";
import { useEffect, useState } from "react";

// Kata-kata = 8 capabilities pada slide 6 & 48 PDF.
const WORDS = ["Engineering", "Fabrication", "Mechanical", "Piping", "Construction", "Commissioning", "Maintenance", "Procurement"];

export default function HeroRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="mt-6 text-xl font-semibold sm:text-2xl">
      <span className="text-slate-300">Solusi </span>
      <span key={i} aria-hidden="true" className="anim-rise inline-block text-gold-400">{WORDS[i]}</span>
      <span className="sr-only">{WORDS.join(", ")}</span>
      <span className="text-slate-300"> terintegrasi</span>
    </p>
  );
}
