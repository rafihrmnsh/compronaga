import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi PT Naga Karya Sakti Indonesia untuk kebutuhan engineering, fabrication, construction, dan maintenance proyek Anda.",
  alternates: { canonical: "/kontak" },
};

export default function Kontak() {
  const a = site.address;
  return (
    <>
      <section className="bg-navy-900 py-14 text-white">
        <div className="container-x">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Kontak</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Let&rsquo;s build your project together</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Sampaikan kebutuhan proyek Anda, tim kami akan menghubungi Anda kembali.</p>
        </div>
      </section>
      <section className="container-x grid gap-12 py-14 lg:grid-cols-5">
        <address className="space-y-6 not-italic lg:col-span-2">
          <div><h2 className="text-sm font-bold uppercase tracking-widest text-brand-600">Alamat</h2>
            <p className="mt-2 text-slate-700">{a.street}, {a.locality}, {a.region} {a.postalCode}</p></div>
          <div><h2 className="text-sm font-bold uppercase tracking-widest text-brand-600">Telepon</h2>
            <p className="mt-2"><a className="text-slate-800 underline-offset-2 hover:underline" href={`tel:${site.phoneHref}`}>{site.phone}</a></p></div>
          <div><h2 className="text-sm font-bold uppercase tracking-widest text-brand-600">Email</h2>
            <p className="mt-2 break-all"><a className="text-slate-800 underline-offset-2 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></p></div>
          <div><h2 className="text-sm font-bold uppercase tracking-widest text-brand-600">Website</h2>
            <p className="mt-2 text-slate-800">{site.url.replace("https://", "")}</p></div>
        </address>
        <div className="lg:col-span-3"><ContactForm /></div>
      </section>
    </>
  );
}
