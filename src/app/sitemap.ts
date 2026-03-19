import { MetadataRoute } from "next";
import { getAllSlugs, getAllCategories, categoryToSlug } from "@/lib/api-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://free-api-world.vercel.app/";
  const slugs = getAllSlugs();
  const categories = getAllCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/finder`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${categoryToSlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const apiRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/api/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...apiRoutes];
}
