import type { Metadata } from "next";
import { getAllApis } from "@/lib/api-utils";
import FinderClient from "./FinderClient";

export const metadata: Metadata = {
  title: "API Finder — Filter 10,000+ Free APIs",
  description:
    "Find the perfect free API using our powerful API Finder. Filter by category, auth type, HTTPS, and CORS support. Browse thousands of public APIs instantly.",
  keywords: ["api finder", "filter apis", "find free apis", "api search", "public api directory"],
};

export default function FinderPage() {
  const apis = getAllApis();
  return <FinderClient apis={apis} />;
}
