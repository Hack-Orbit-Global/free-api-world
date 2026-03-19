"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ApiIndex, categoryToSlug } from "@/lib/types";
import ApiCard from "@/components/ApiCard";

const PAGE_SIZE = 20;

interface Props {
  apis: ApiIndex[];
  catName: string;
  catSlug: string;
  emoji: string;
}

export default function CategoryClient({ apis, catName, catSlug, emoji }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(apis.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageApis = apis.slice(start, start + PAGE_SIZE);
  const noAuthCount = apis.filter((a) => a.auth === "No").length;
  const httpsCount = apis.filter((a) => a.https).length;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Smart page numbers: always show first, last, and window around current
  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 2 && i <= page + 2)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="container" style={{ padding: "2rem 1.25rem 4rem" }}>
      {/* Breadcrumb */}
      <nav
        style={{
          marginBottom: "1.5rem",
          fontSize: "0.8rem",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <Link href="/" style={{ color: "var(--text-dim)" }}>
          home
        </Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <Link href="/finder" style={{ color: "var(--text-dim)" }}>
          browse
        </Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--accent)" }}>{catName.toLowerCase()}</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>{emoji}</span>
          <h1
            style={{
              margin: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "var(--text-bright)",
              letterSpacing: "-0.02em",
            }}
          >
            Best Free {catName} APIs
          </h1>
        </div>

        <p
          style={{
            margin: "0 0 1.25rem",
            color: "var(--text-dim)",
            fontSize: "0.95rem",
            maxWidth: "620px",
            lineHeight: 1.7,
          }}
        >
          Explore {apis.length} free {catName} APIs for your next project. All
          APIs listed are publicly accessible with free tiers available.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[
            { label: "Total APIs", value: apis.length },
            { label: "No Auth Required", value: noAuthCount },
            { label: "HTTPS Supported", value: httpsCount },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick filter links to other categories */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/finder"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            color: "var(--accent)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ← Browse all categories in API Finder
        </Link>
      </div>

      {/* Pagination info */}
      {totalPages > 1 && (
        <p
          style={{
            marginBottom: "1.25rem",
            fontSize: "0.8rem",
            color: "var(--text-dim)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, apis.length)} of{" "}
          {apis.length} APIs · Page {page} of {totalPages}
        </p>
      )}

      {/* API Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
          marginBottom: "2.5rem",
        }}
      >
        {pageApis.map((api) => (
          <ApiCard key={api.slug} api={api} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Page navigation"
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-link"
            aria-label="Previous page"
            style={{ opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? "not-allowed" : "pointer" }}
          >
            ←
          </button>

          {getPages().map((p, i) =>
            p === "..." ? (
              <span
                key={`dot-${i}`}
                style={{ color: "var(--text-dim)", padding: "0 4px", lineHeight: "36px" }}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`page-link${p === page ? " active" : ""}`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="page-link"
            aria-label="Next page"
            style={{ opacity: page === totalPages ? 0.4 : 1, cursor: page === totalPages ? "not-allowed" : "pointer" }}
          >
            →
          </button>
        </nav>
      )}

      {/* SEO section */}
      <section
        style={{
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1rem",
            color: "var(--text-bright)",
            margin: "0 0 0.75rem",
          }}
        >
          About Free {catName} APIs
        </h2>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            maxWidth: "720px",
            margin: "0 0 1rem",
          }}
        >
          {catName} APIs give developers programmatic access to{" "}
          {catName.toLowerCase()} data and services without needing to build
          infrastructure from scratch. All APIs listed on FreeAPIWorld include
          a free tier — some with no authentication required at all.
        </p>
        <p
          style={{
            color: "var(--text-dim)",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            maxWidth: "720px",
            margin: 0,
          }}
        >
          Use our{" "}
          <Link href="/finder" style={{ color: "var(--accent)" }}>
            API Finder
          </Link>{" "}
          to filter {catName} APIs by authentication method, HTTPS requirement,
          and CORS support — or{" "}
          <a
            href={`https://github.com/Hack-Orbit-Global/free-api-world/issues/new?template=suggest-api.md&title=[API]+${encodeURIComponent(catName)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            suggest a missing {catName} API
          </a>{" "}
          on GitHub.
        </p>
      </section>
    </div>
  );
}
