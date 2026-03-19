// ─── CLIENT-SAFE ────────────────────────────────────────────────
// This file has NO Node.js imports (no fs, no path).
// Safe to import from both server and client components.
// ────────────────────────────────────────────────────────────────

export interface ApiIndex {
  slug: string;
  name: string;
  category: string;
  auth: string;
  https: boolean;
  cors: boolean;
  description: string;
}

export interface ApiDetail extends ApiIndex {
  longDescription: string;
  baseUrl: string;
  docsUrl: string;
  version: string;
  pricing: string;
  tags: string[];
  exampleRequest: {
    method: string;
    endpoint: string;
    response: string;
  };
  relatedSlugs: string[];
  alsoSearched: string[];
  affiliateText: string;
  featured: boolean;
}

// ─── Pure helper functions (no I/O) ─────────────────────────────

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const CATEGORY_EMOJIS: Record<string, string> = {
  Weather: "🌤",
  Games: "🎮",
  Science: "🔬",
  Health: "💊",
  Geography: "🌍",
  Development: "⚙️",
  Animals: "🐾",
  "AI & ML": "🤖",
  Finance: "📈",
  News: "📰",
  Language: "🗣",
  Entertainment: "🎭",
};

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJIS[category] || "📡";
}
