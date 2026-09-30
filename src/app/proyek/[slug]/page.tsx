import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkPage from "@/components/WorkPage";
import { projects } from "@/data/content";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const w = projects.find((p) => p.slug === slug);
  if (!w) return {};
  const description = `Dokumentasi ${w.title} oleh PT Naga Karya Sakti Indonesia.`;
  return { title: w.title, description, alternates: { canonical: `/proyek/${w.slug}` },
    openGraph: { title: w.title, description, images: [{ url: w.images[0].src }] } };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const w = projects.find((p) => p.slug === slug);
  if (!w) notFound();
  return <WorkPage work={w} category="Project Kami" base="/proyek" anchor="proyek" others={projects} />;
}
