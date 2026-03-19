import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllApis,
  getCategoryStats,
  getFeaturedApis,
  getCategoryEmoji,
  categoryToSlug,
} from "@/lib/api-utils";
import SearchBar from "@/components/SearchBar";
import ApiCard from "@/components/ApiCard";

export const metadata: Metadata = {
  title: "FreeAPIWorld — Universe of Free APIs",
  description:
    "Discover thousands of free public APIs for weather, finance, AI, games, and more. The ultimate API directory for developers — searchable, filterable, and always free.",
};

export default function HomePage() {
  const allApis = getAllApis();
  const categoryStats = getCategoryStats();
  const featured = getFeaturedApis();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 0 3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0,229,160,0.06)",
              border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: "100px",
              padding: "4px 14px",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "var(--accent)",
                borderRadius: "50%",
                boxShadow: "0 0 8px var(--accent)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {allApis.length}+ Free APIs · Open Source · Community-First
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--text-bright)",
              margin: "0 0 0.75rem",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "var(--accent)" }}>Free</span>APIWorld
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              color: "var(--text-dim)",
              marginBottom: "2.5rem",
              letterSpacing: "0.04em",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            universe of free apis
          </p>

          {/* Search */}
          <SearchBar apis={allApis} />

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Total APIs", value: allApis.length + "+" },
              { label: "Categories", value: categoryStats.length },
              { label: "No Auth Required", value: allApis.filter((a) => a.auth === "No").length + "+" },
              { label: "HTTPS Only", value: allApis.filter((a) => a.https).length + "+" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────── */}
      <section style={{ padding: "2rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2
              style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Browse by Category
            </h2>
            <Link href="/finder" style={{ fontSize: "0.8rem", color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
              View all →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "8px",
            }}
          >
            {categoryStats.map(({ category, count }) => (
              <Link
                key={category}
                href={`/category/${categoryToSlug(category)}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{getCategoryEmoji(category)}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-bright)" }}>
                    {category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                    }}
                  >
                    {count} APIs
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED APIs ────────────────────────────────────── */}
      <section style={{ padding: "3rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ⚡ Featured APIs
            </h2>
            <Link
              href="/finder"
              style={{ fontSize: "0.8rem", color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Browse all {allApis.length} APIs →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "12px",
            }}
          >
            {featured.map((api) => (
              <ApiCard key={api.slug} api={api} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── API FINDER CTA ───────────────────────────────────── */}
      <section style={{ padding: "1rem 0 3rem" }}>
        <div className="container">
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              borderRadius: "12px",
              padding: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                right: "-60px",
                top: "-60px",
                width: "240px",
                height: "240px",
                background: "radial-gradient(circle, rgba(0,229,160,0.08), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1.25rem",
                  color: "var(--text-bright)",
                }}
              >
                Find the perfect API
              </h3>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.9rem" }}>
                Filter by category, auth type, HTTPS support, and CORS. Instantly.
              </p>
            </div>
            <Link href="/finder" className="btn btn-accent">
              Open API Finder →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT / STORY ────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: "3rem 0 4rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "720px" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>
              About FreeAPIWorld
            </p>
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                color: "var(--text-bright)",
                margin: "0 0 1.5rem",
                lineHeight: 1.3,
              }}
            >
              Built for developers,{" "}
              <span style={{ color: "var(--accent)" }}>by the community</span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "var(--text)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ color: "var(--text-bright)" }}>FreeAPIWorld</strong> is
                built to make discovering free APIs simple, fast, and accessible for every
                developer — from beginners shipping their first project to engineers
                building production systems.
              </p>
              <p style={{ margin: 0 }}>
                This project is part of{" "}
                <a href="https://github.com/bariksabarna" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>
                  Hack Orbit
                </a>{" "}
                — an open developer ecosystem focused on building, contributing, and growing
                together. Created and maintained by{" "}
                <a href="https://github.com/bariksabarna" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                  Sabarna Barik
                </a>
                , FreeAPIWorld is designed as a community-first platform where developers
                can explore APIs, suggest new ones, and contribute to the ecosystem.
              </p>
              <p style={{ margin: 0 }}>
                While the platform is free to use, it is not built as an unsustainable
                &ldquo;completely free forever&rdquo; system. To support hosting, domains,
                community initiatives, hackathons, and developer swag, the platform includes
                ethical monetization such as affiliate links and partnerships.
              </p>
              <p style={{ margin: 0 }}>
                Every bit of support helps in building better tools, supporting contributors,
                and growing the developer community.
              </p>

              <div
                style={{
                  marginTop: "0.5rem",
                  paddingLeft: "1.25rem",
                  borderLeft: "3px solid var(--accent)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1rem",
                  color: "var(--accent)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                Build. Contribute. Orbit Together.
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "2rem", flexWrap: "wrap" }}>
              <a
                href="https://github.com/Hack-Orbit-Global/free-api-world"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                ★ Star on GitHub
              </a>
              <a
                href="https://github.com/Hack-Orbit-Global/free-api-world/issues/new?template=suggest-api.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                + Suggest an API
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
