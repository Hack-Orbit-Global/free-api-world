import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getApisByCategory,
  getCategoryEmoji,
  categoryToSlug,
  slugToCategory,
} from "@/lib/api-utils";
import CategoryClient from "./CategoryClient";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: categoryToSlug(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catName = slugToCategory(params.category);
  const apis = getApisByCategory(catName);
  if (!apis.length) return { title: "Category Not Found" };

  const title = `Best Free ${catName} APIs — ${apis.length} Options`;
  const description = `Discover ${apis.length} free ${catName} APIs for developers. Compare auth types, HTTPS support, and CORS. All APIs are free and publicly accessible.`;

  return {
    title,
    description,
    keywords: [
      `free ${catName.toLowerCase()} api`,
      `${catName.toLowerCase()} api`,
      `best ${catName.toLowerCase()} apis`,
      "public api",
      "free api",
    ],
    openGraph: { title, description, type: "website" },
    alternates: { canonical: `/category/${params.category}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const catName = slugToCategory(params.category);
  const apis = getApisByCategory(catName);
  if (!apis.length) notFound();

  return (
    <CategoryClient
      apis={apis}
      catName={catName}
      catSlug={params.category}
      emoji={getCategoryEmoji(catName)}
    />
  );
}
