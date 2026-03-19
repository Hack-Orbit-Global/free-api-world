import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getApiBySlug,
  getRelatedApis,
  getCategoryEmoji,
  categoryToSlug,
} from "@/lib/api-utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const api = getApiBySlug(params.slug);
  if (!api) return { title: "API Not Found" };

  const title = `${api.name} — Free ${api.category} API`;
  const description = `${api.description} Auth: ${api.auth}. HTTPS: ${api.https ? "Yes" : "No"}. CORS: ${api.cors ? "Yes" : "No"}. Free to use.`;

  return {
    title,
    description,
    keywords: [
      api.name.toLowerCase(),
      `${api.category.toLowerCase()} api`,
      "free api",
      "public api",
      ...(api.tags || []),
    ],
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `/api/${params.slug}` },
  };
}

export default function ApiPage({ params }: Props) {
  const api = getApiBySlug(params.slug);
  if (!api) notFound();

  const related = getRelatedApis(api.relatedSlugs || []);
  const categorySlug = categoryToSlug(api.category);

  const authBadge =
    api.auth === "No"
      ? "badge-green"
      : api.auth === "apiKey"
      ? "badge-blue"
      : api.auth === "OAuth"
      ? "badge-yellow"
      : "badge-gray";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: api.name,
    description: api.description,
    applicationCategory: api.category,
    url: api.docsUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container" style={{ padding: "2rem 1.25rem 4rem" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
          <Link href="/" style={{ color: "var(--text-dim)" }}>home</Link>
          <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
          <Link href={`/category/${categorySlug}`} style={{ color: "var(--text-dim)" }}>
            {api.category.toLowerCase()}
          </Link>
          <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
          <span style={{ color: "var(--accent)" }}>{api.slug}</span>
        </nav>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
          {/* ── MAIN CONTENT ── */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "2rem" }}>{getCategoryEmoji(api.category)}</span>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    fontWeight: 700,
                    color: "var(--text-bright)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {api.name}
                </h1>
              </div>
              <p style={{ margin: "0 0 1rem", fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.7 }}>
                {api.description}
              </p>

              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className={`badge ${authBadge}`}>
                  Auth: {api.auth === "No" ? "None Required" : api.auth}
                </span>
                <span className={`badge ${api.https ? "badge-green" : "badge-red"}`}>
                  HTTPS: {api.https ? "✓ Yes" : "✗ No"}
                </span>
                <span className={`badge ${api.cors ? "badge-green" : "badge-red"}`}>
                  CORS: {api.cors ? "✓ Yes" : "✗ No"}
                </span>
                <span className="badge badge-gray">{api.category}</span>
                {api.version && (
                  <span className="badge badge-gray">v{api.version}</span>
                )}
              </div>
            </div>

            {/* About */}
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>
                About
              </h2>
              <p style={{ margin: 0, color: "var(--text)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {api.longDescription}
              </p>
            </section>

            {/* Example Request */}
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>
                Example Request
              </h2>
              <div
                style={{
                  background: "#0a0e16",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Endpoint bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    borderBottom: "1px solid var(--border)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>
                    {api.exampleRequest.method}
                  </span>
                  <code style={{ fontSize: "0.78rem", color: "var(--text)", wordBreak: "break-all", flex: 1 }}>
                    {api.exampleRequest.endpoint}
                  </code>
                </div>
                {/* Response */}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Example Response
                  </p>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                      color: "#a5d6ff",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {api.exampleRequest.response}
                  </pre>
                </div>
              </div>
            </section>

            {/* Also Searched */}
            {api.alsoSearched && api.alsoSearched.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>
                  Also Searched
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {api.alsoSearched.map((term) => (
                    <span
                      key={term}
                      style={{
                        padding: "4px 10px",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "100px",
                        fontSize: "0.78rem",
                        color: "var(--text-dim)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Related APIs */}
            {related.length > 0 && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>
                  Related APIs
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/api/${rel.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="card"
                        style={{ padding: "0.875rem", display: "flex", flexDirection: "column", gap: "4px" }}
                      >
                        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-bright)", fontFamily: "'JetBrains Mono', monospace" }}>
                          {rel.name}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                          {rel.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Affiliate Section */}
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                borderRadius: "10px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p style={{ margin: "0 0 4px", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-bright)" }}>
                  Need hosting or backend for this API?
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  {api.affiliateText}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0, flexWrap: "wrap" }}>
                <a href="#" target="_blank" rel="noopener noreferrer sponsored" className="btn btn-outline" style={{ fontSize: "0.8rem" }}>
                  Deploy on Vercel
                </a>
                <a href="https://railway.app?utm_source=freeapiworld" target="_blank" rel="noopener noreferrer sponsored" className="btn btn-outline" style={{ fontSize: "0.8rem" }}>
                  Try Railway
                </a>
              </div>
            </section>
          </div>

          {/* ── SIDEBAR ── */}
          <aside style={{ position: "sticky", top: "72px" }}>
            {/* Quick Info */}
            <div className="card" style={{ padding: "1.25rem", marginBottom: "1rem" }}>
              <p style={{ margin: "0 0 1rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Quick Info
              </p>
              <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Base URL", value: api.baseUrl },
                  { label: "Auth", value: api.auth === "No" ? "None Required" : api.auth },
                  { label: "HTTPS", value: api.https ? "Yes" : "No" },
                  { label: "CORS", value: api.cors ? "Supported" : "Not Supported" },
                  { label: "Pricing", value: api.pricing },
                  { label: "Category", value: api.category },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "2px" }}>
                      {label}
                    </dt>
                    <dd style={{ margin: 0, fontSize: "0.82rem", color: "var(--text)", wordBreak: "break-all", fontFamily: label === "Base URL" ? "'JetBrains Mono', monospace" : "inherit" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.25rem", paddingTop: "1.25rem" }}>
                <a
                  href={api.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  View Documentation ↗
                </a>
              </div>
            </div>

            {/* Tags */}
            {api.tags && api.tags.length > 0 && (
              <div className="card" style={{ padding: "1.25rem", marginBottom: "1rem" }}>
                <p style={{ margin: "0 0 0.75rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Tags
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {api.tags.map((tag) => (
                    <span key={tag} className="badge badge-gray">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Community */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <p style={{ margin: "0 0 0.75rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Community
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href={`https://github.com/HackOrbit/freeapiworld/issues/new?template=bug-report.md&title=Issue+with+${encodeURIComponent(api.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: "0.8rem", justifyContent: "center" }}
                >
                  🐛 Report Issue
                </a>
                <a
                  href="#issues/new?template=suggest-api.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: "0.8rem", justifyContent: "center" }}
                >
                  + Suggest an API
                </a>
                <Link
                  href={`/category/${categorySlug}`}
                  className="btn btn-outline"
                  style={{ fontSize: "0.8rem", justifyContent: "center" }}
                >
                  More {api.category} APIs →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
