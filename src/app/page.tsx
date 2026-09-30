import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import WorkCard from "@/components/WorkCard";
import HeroRotator from "@/components/HeroRotator";
import Stats from "@/components/Stats";
import ServiceTabs from "@/components/ServiceTabs";
import Marquee from "@/components/Marquee";
import { about, clients, gcWorks, misi, projects, sectors, services, single, tools, visi } from "@/data/content";
import { site } from "@/data/site";

const d = (n: number, step = 90) => ({ ["--d" as string]: `${n * step}ms` });

export default function Home() {
  const hero = single("hero"), aboutImg = single("about");
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div data-parallax className="absolute inset-0 -z-20 will-change-transform" style={{ transform: "scale(1.08)" }}>
          <Image src={hero.src} alt="Storage tank hasil pekerjaan NKSI" fill priority quality={55} sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        {/* Cahaya dekoratif: radial-gradient statis (tanpa filter blur/animasi berat agar render cepat) */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(420px_circle_at_88%_18%,rgb(179_38_43/.30),transparent_70%),radial-gradient(360px_circle_at_40%_100%,rgb(195_154_63/.20),transparent_70%)]" />

        <div className="container-x pb-10 pt-20 sm:pt-28 lg:pt-32">
          <p className="anim-rise text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Est. {site.founded}</p>
          <h1 className="anim-rise mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: "120ms" }}>
            {site.name}
          </h1>
          <div className="anim-rise" style={{ animationDelay: "240ms" }}><HeroRotator /></div>
          <p className="anim-rise mt-4 max-w-2xl text-base leading-relaxed text-slate-300" style={{ animationDelay: "360ms" }}>
            {site.tagline}. Dari engineering hingga installation, commissioning, dan maintenance.
          </p>
          <div className="anim-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "480ms" }}>
            <Link href="/kontak" className="rounded-md bg-brand-700 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lg active:scale-95">Hubungi Kami</Link>
            <Link href="#proyek" className="rounded-md border border-white/40 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-95">Lihat Proyek</Link>
          </div>
          <div className="anim-rise mt-14" style={{ animationDelay: "600ms" }}><Stats /></div>
          <a href="#tentang" aria-label="Gulir ke bawah" className="mx-auto mt-8 hidden h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 pt-1.5 sm:flex">
            <span className="h-2 w-1 rounded-full bg-white" style={{ animation: "bounce-y 1.6s infinite" }} />
          </a>
        </div>
      </section>

      {/* TENTANG KAMI */}
      <Section id="tentang" eyebrow="Tentang Kami" title="Kontraktor umum dengan layanan engineering terintegrasi">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-slate-700">
            {about.map((p, n) => <p key={p.slice(0, 24)} data-reveal="left" style={d(n, 80)}>{p}</p>)}
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Sektor yang dilayani">
              {sectors.map((s, n) => (
                <li key={s} data-reveal="zoom" style={d(n, 60)} className="cursor-default rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:text-white">{s}</li>
              ))}
            </ul>
          </div>
          <div data-reveal="right" className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image src={aboutImg.src} alt="Tim NKSI memeriksa komponen fabrikasi di workshop" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
          </div>
        </div>
      </Section>

      {/* VISI & MISI */}
      <Section id="visi-misi" eyebrow="Visi & Misi" title="Arah dan komitmen kami" tone="mist">
        <div className="grid gap-8 lg:grid-cols-5">
          <div data-reveal="left" className="spot rounded-2xl bg-navy-900 p-8 text-white shadow-xl lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Visi</h3>
            <p className="mt-4 text-lg leading-relaxed">{visi}</p>
          </div>
          <div className="lg:col-span-3">
            <h3 data-reveal className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Misi</h3>
            <ol className="mt-4 grid gap-4 sm:grid-cols-2">
              {misi.map((m, i) => (
                <li key={m} data-reveal style={d(i, 110)} className="group spot rounded-xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="text-3xl font-extrabold text-brand-700 transition-transform duration-300 group-hover:scale-110 inline-block">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* OUR CORE SERVICES */}
      <Section id="layanan" eyebrow="Our Core Services" title="Layanan inti kami" intro="Pilih layanan untuk melihat cakupan pekerjaannya.">
        <div data-reveal><ServiceTabs services={services} /></div>
      </Section>

      {/* KLIEN */}
      <Section id="klien" eyebrow="Klien" title="Klien kami" tone="mist">
        <div data-reveal><Marquee clients={clients} /></div>
      </Section>

      {/* TOOLS */}
      <Section id="tools" eyebrow="Tools" title="Peralatan kerja kami" intro="Dokumentasi peralatan kerja NKSI. Klik foto untuk memperbesar; geser atau gunakan panah keyboard untuk berpindah.">
        <Gallery images={tools} label="Peralatan kerja NKSI" />
      </Section>

      {/* PROYEK KAMI */}
      <Section id="proyek" eyebrow="Project Kami" title="Proyek yang telah kami kerjakan" intro="Arahkan kursor ke kartu untuk melihat foto lainnya." tone="mist">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, n) => <li key={p.slug} data-reveal style={d(n % 3, 120)}><WorkCard work={p} base="/proyek" /></li>)}
        </ul>
      </Section>

      {/* GENERAL CONTRACTOR */}
      <Section id="general-contractor" eyebrow="General Contractor" title="Proyek General Contractor kami">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gcWorks.map((p, n) => <li key={p.slug} data-reveal style={d(n % 3, 120)}><WorkCard work={p} base="/general-contractor" /></li>)}
        </ul>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-700 py-14 text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(300px_circle_at_5%_0%,rgb(255_255_255/.12),transparent_70%)]" />
        <div className="container-x relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center" data-reveal>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Let&rsquo;s build your project together</h2>
            <p className="mt-2 max-w-xl text-brand-100">Integrated Industrial Solutions untuk kebutuhan proyek Anda.</p>
          </div>
          <Link href="/kontak" className="group rounded-md bg-white px-6 py-3 font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg active:scale-95">
            Hubungi Kami <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
