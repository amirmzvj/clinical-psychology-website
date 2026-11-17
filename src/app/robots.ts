import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://zahra-zeinali.ir/sitemap.xml",
    host: "https://zahra-zeinali.ir",
  };
}
