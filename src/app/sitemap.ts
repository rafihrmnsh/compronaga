import type { MetadataRoute } from "next";
import { gcWorks, projects } from "@/data/content";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/kontak`, lastModified: now, priority: 0.7 },
    ...projects.map((p) => ({ url: `${site.url}/proyek/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...gcWorks.map((p) => ({ url: `${site.url}/general-contractor/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
