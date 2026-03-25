import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FreeAPIWorld — Universe of Free APIs",
  description:
    "Learn about FreeAPIWorld — who built it, why it exists, and how it helps developers discover free public APIs. Part of the Hack Orbit open developer ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "3rem 1.25rem 5rem", maxWidth: "800px" }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/" style={{ color: "var(--text-dim)" }}>home</Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--accent)" }}>about</span>
      </nav>

      {/* Hero */}
      <div style={{ marginBottom: "3rem" }}>
        <p className="section-label" style={{ marginBottom: "0.75rem" }}>About</p>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--text-bright)",
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          Universe of{" "}
          <span style={{ color: "var(--accent)" }}>Free APIs</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", lineHeight: 1.8, margin: 0 }}>
          FreeAPIWorld is a free, open-source API directory built to help every developer —
          beginner or expert — discover the right public API for their next project in seconds.
        </p>
      </div>

      <Divider />

      {/* Mission */}
      <Section title="Our Mission">
        <p>
          Finding a free, reliable API shouldn&apos;t require hours of Googling, outdated Reddit threads,
          or sifting through broken links. FreeAPIWorld exists to solve that — one indexed, verified,
          searchable directory of free public APIs with real documentation links, auth info, and example
          responses.
        </p>
        <p>
          We believe developer tools should be free and accessible. Every API on this platform has a
          free tier. No paywalls. No hidden costs. Just code.
        </p>
      </Section>

      <Divider />

      {/* Story */}
      <Section title="The Story">
        <p>
          FreeAPIWorld was created and is maintained by{" "}
          <a href="https://github.com/bariksabarna" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            Sabarna Barik
          </a>
          {" "}as part of{" "}
          <a href="https://hackorbitglobal.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            Hack Orbit
          </a>
          {" "}— an open developer ecosystem focused on building, contributing, and growing together.
        </p>
        <p>
          The project started from a simple frustration: there was no single, fast, well-maintained
          place to browse free APIs by category, filter by auth type, and instantly see example
          requests. So we built one.
        </p>
        <p>
          FreeAPIWorld is open source. The entire codebase and all API data live on GitHub.
          Anyone can contribute a new API, fix outdated information, or improve the platform.
        </p>
      </Section>

      <Divider />

      {/* What we offer */}
      <Section title="What FreeAPIWorld Offers">
        <ul style={{ paddingLeft: "1.25rem", lineHeight: 2, color: "var(--text)", margin: 0 }}>
          <li>A searchable, filterable directory of 10,000+ free public APIs</li>
          <li>Category browsing across Weather, Finance, AI &amp; ML, Games, Health, and more</li>
          <li>Per-API detail pages with auth type, HTTPS/CORS status, base URLs, and example responses</li>
          <li>API Finder tool — filter by category, auth, HTTPS, and CORS instantly</li>
          <li>Internal linking and SEO-optimized pages for every API and category</li>
          <li>Community-driven: anyone can suggest or report an API via GitHub</li>
        </ul>
      </Section>

      <Divider />

      {/* Sustainability */}
      <Section title="Sustainability & Monetization">
        <p>
          FreeAPIWorld is free to use and will remain free. However, running a platform — hosting,
          domains, community initiatives, hackathons, and developer tools — has real costs.
        </p>
        <p>
          To keep the lights on, FreeAPIWorld uses <strong style={{ color: "var(--text-bright)" }}>ethical monetization</strong>:
          affiliate links to hosting providers (such as Vercel, Railway, Netlify, and Supabase) placed
          contextually on API detail pages. We also display advertisements through Google AdSense to
          support ongoing development.
        </p>
        <p>
          We do not sell user data. We do not run pop-ups or intrusive ads. Every monetization
          decision is made with the developer experience as the priority.
        </p>
      </Section>

      <Divider />

      {/* Open source */}
      <Section title="Open Source">
        <p>
          The full source code for FreeAPIWorld is available under the Apache License 2.0. The API data
          files are structured JSON — adding a new API requires two small file edits and a pull request.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "1.25rem" }}>
          <a
            href="https://github.com/Hack-Orbit-global/free-api-world"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            ★ Star on GitHub
          </a>
          <a
            href="https://github.com/Hack-Orbit-global/free-api-world/issues/new?template=suggest-api.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            + Suggest an API
          </a>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </Section>

      <Divider />

      {/* Contact */}
      <Section title="Contact">
        <p>
          Have a question, partnership inquiry, or want to report an issue?{" "}
          <Link href="/contact" style={{ color: "var(--accent)" }}>
            Visit our Contact page
          </Link>{" "}
          or open a{" "}
          <a
            href="https://github.com/Hack-Orbit-global/free-api-world/issues"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            GitHub Issue
          </a>
          .
        </p>
      </Section>

    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background: "var(--border)",
        margin: "2.5rem 0",
      }}
    />
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "0.5rem" }}>
      <h2
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--accent)",
          margin: "0 0 1rem",
          letterSpacing: "0.02em",
        }}
      >
        // {title}
      </h2>
      <div
        style={{
          color: "var(--text)",
          fontSize: "0.95rem",
          lineHeight: 1.85,
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}
