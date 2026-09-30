import Link from "next/link";
import Gallery from "@/components/Gallery";
import type { Work } from "@/data/content";

export default function WorkPage({ work, category, base, anchor, others }: { work: Work; category: string; base: string; anchor: string; others: Work[] }) {
  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <Link href="/" className="hover:text-white">Beranda</Link> / <Link href={`/#${anchor}`} className="hover:text-white">{category}</Link>
          </nav>
          <h1 className="anim-rise mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">{work.title}</h1>
          {work.client && <p className="mt-2 text-slate-300">{work.client}</p>}
        </div>
      </section>
      <section className="container-x py-12" aria-label="Galeri foto">
        <Gallery images={work.images} label={work.title} cols="sm:grid-cols-2 lg:grid-cols-3" />
      </section>
      <section className="bg-mist py-12" aria-labelledby="lainnya">
        <div className="container-x">
          <h2 id="lainnya" className="text-xl font-bold text-navy-900">{category} lainnya</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.filter((o) => o.slug !== work.slug).map((o) => (
              <li key={o.slug}><Link href={`${base}/${o.slug}`} className="inline-block rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:border-brand-600 hover:text-brand-700">{o.title}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
