// Semua fakta perusahaan berasal dari COMPRO_NKSI (slide 1 & 48). Ubah di sini saja.
export const site = {
  name: "PT Naga Karya Sakti Indonesia",
  short: "NKSI",
  tagline: "General Contractor | Engineering | Fabrication | Construction | Commissioning & Maintenance",
  description:
    "PT Naga Karya Sakti Indonesia (NKSI) adalah General Contractor yang menyediakan layanan engineering dan pelaksanaan konstruksi terintegrasi untuk proyek industri.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ptnksi.co.id",
  founded: "2022",
  phone: "0817-1717-1669",
  phoneHref: "+6281717171669",
  email: "pt.nagakaryasakti@gmail.com",
  address: {
    street: "W2XP+WX5, Jl. Bukit Cilegon Asri, Bagendung",
    locality: "Kec. Cilegon, Kota Cilegon",
    region: "Banten",
    postalCode: "42419",
    country: "ID",
  },
} as const;

export const nav = [
  { href: "/#tentang", label: "Tentang" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#klien", label: "Klien" },
  { href: "/#tools", label: "Tools" },
  { href: "/#proyek", label: "Proyek" },
  { href: "/#general-contractor", label: "General Contractor" },
  { href: "/kontak", label: "Kontak" },
];
