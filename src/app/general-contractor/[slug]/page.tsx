import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkPage from "@/components/WorkPage";
import { gcWorks } from "@/data/content";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => gcWorks.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const w = gcWorks.find((p) => p.slug === slug);
  if (!w) return {};
  const description = `Dokumentasi pekerjaan General Contractor: ${w.title} oleh PT Naga Karya Sakti Indonesia.`;
  return { title: `${w.title} - General Contractor`, description, alternates: { canonical: `/general-contractor/${w.slug}` },
    openGraph: { title: w.title, description, images: [{ url: w.images[0].src }] } };
}

export default async function Page({ params }: P) {
  const { slug } = await params;
  const w = gcWorks.find((p) => p.slug === slug);
  if (!w) notFound();
  return <WorkPage work={w} category="General Contractor" base="/general-contractor" anchor="general-contractor" others={gcWorks} />;
}
