import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/data/site";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-x grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={40} height={32} className="h-8 w-auto" loading="lazy" />
            <span className="text-sm font-extrabold tracking-wide text-white">{site.name.toUpperCase()}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{site.tagline}</p>
          <p className="mt-2 text-sm text-gold-400">EST. {site.founded}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Menu</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Kontak</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{a.street}, {a.locality}, {a.region} {a.postalCode}</p>
            <p><a className="hover:text-white" href={`tel:${site.phoneHref}`}>{site.phone}</a></p>
            <p><a className="break-all hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
