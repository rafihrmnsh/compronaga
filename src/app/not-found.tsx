import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl font-extrabold text-navy-900">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-slate-600">Halaman yang Anda cari tidak tersedia.</p>
      <Link href="/" className="mt-6 inline-block rounded-md bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800">Ke Beranda</Link>
    </div>
  );
}
