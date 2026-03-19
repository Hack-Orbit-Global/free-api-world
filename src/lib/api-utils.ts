// ─── SERVER ONLY ────────────────────────────────────────────────
// This file uses Node.js `fs` and `path` — only import it from
// Server Components, generateStaticParams, or generateMetadata.
// NEVER import this from a "use client" component.
// ────────────────────────────────────────────────────────────────
import fs from "fs";
import path from "path";

// Re-export all types and pure helpers so server components
// only need one import.
export type { ApiIndex, ApiDetail } from "./types";
export { categoryToSlug, getCategoryEmoji, CATEGORY_EMOJIS } from "./types";

import type { ApiIndex, ApiDetail } from "./types";
import { categoryToSlug } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

export function getAllApis(): ApiIndex[] {
  const filePath = path.join(DATA_DIR, "apis-index.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getApiBySlug(slug: string): ApiDetail | null {
  const filePath = path.join(DATA_DIR, "apis", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getApisByCategory(category: string): ApiIndex[] {
  const all = getAllApis();
  return all.filter(
    (api) => api.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const all = getAllApis();
  const cats = new Set(all.map((a) => a.category));
  return Array.from(cats).sort();
}

export function getCategoryStats(): { category: string; count: number }[] {
  const all = getAllApis();
  const counts: Record<string, number> = {};
  all.forEach((api) => {
    counts[api.category] = (counts[api.category] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedApis(): ApiIndex[] {
  const all = getAllApis();
  const featured: ApiIndex[] = [];
  for (const api of all) {
    try {
      const detail = getApiBySlug(api.slug);
      if (detail?.featured) featured.push(api);
    } catch {
      // ignore missing detail files
    }
  }
  return featured.length > 0 ? featured : all.slice(0, 6);
}

export function getAllSlugs(): string[] {
  return getAllApis().map((a) => a.slug);
}

export function getRelatedApis(slugs: string[]): ApiIndex[] {
  if (!slugs || slugs.length === 0) return [];
  const all = getAllApis();
  return all.filter((api) => slugs.includes(api.slug));
}

export function slugToCategory(slug: string): string {
  return (
    getAllCategories().find((cat) => categoryToSlug(cat) === slug) || slug
  );
}
