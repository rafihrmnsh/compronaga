"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";

const SECTION_IDS = ["tentang", "visi-misi", "layanan", "klien", "tools", "proyek", "general-contractor"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 12);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: sorot menu sesuai section yang sedang terlihat (hanya di beranda)
  useEffect(() => {
    if (path !== "/") { setActive(""); return; }
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((e) => io.observe(e));
    const hero = () => { if (scrollY < 200) setActive(""); };
    addEventListener("scroll", hero, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", hero); };
  }, [path]);

  const isActive = (href: string) => (href === "/kontak" ? path === "/kontak" : href.startsWith("/#") && active === href.slice(2));

  return (
    <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "border-slate-200 bg-white/95 shadow-md backdrop-blur" : "border-transparent bg-white/90 backdrop-blur"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Lewati ke konten
      </a>
      <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
        <Link href="/" className="group flex items-center gap-2" aria-label={`${site.name} - beranda`}>
          <Image src="/logo.png" alt="" width={40} height={32} priority className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="text-[13px] font-extrabold leading-tight tracking-wide text-navy-900 sm:text-sm">
            PT NAGA KARYA
            <br className="sm:hidden" /> SAKTI INDONESIA
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "true" : undefined}
                  className={`nav-link block rounded-md px-3 py-2 hover:text-brand-700 ${isActive(n.href) ? "text-brand-700" : "text-slate-700"}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 lg:hidden"
          aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Navigasi seluler" hidden={!open} className="border-t border-slate-200 bg-white lg:hidden">
        <ul className="container-x py-2">
          {nav.map((n, i) => (
            <li key={n.href} className={open ? "anim-rise" : ""} style={{ animationDelay: `${i * 40}ms` }}>
              <Link href={n.href} onClick={() => setOpen(false)}
                className={`block rounded-md px-2 py-3 text-base font-medium hover:bg-brand-50 ${isActive(n.href) ? "bg-brand-50 text-brand-700" : "text-slate-800"}`}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
