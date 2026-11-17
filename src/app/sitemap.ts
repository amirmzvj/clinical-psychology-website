import type { MetadataRoute } from "next";
import { ARTICLES, SERVICES } from "@/lib/content";

const BASE_URL = "https://zahra-zeinali.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/booking`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/assessment`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...staticRoutes,
    ...ARTICLES.map((article) => ({
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...SERVICES.map((service) => ({
      url: `${BASE_URL}/services#${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
