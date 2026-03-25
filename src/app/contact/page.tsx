import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — FreeAPIWorld",
  description:
    "Get in touch with the FreeAPIWorld team. Report a broken API, suggest a new API, ask a question, or discuss partnerships.",
};

const CONTACT_EMAIL = "https://discord.com/invite/GVNnacYENf";
const GITHUB_URL = "https://github.com/Hack-Orbit-global/free-api-world";
const DISCORD_URL = "https://discord.com/invite/GVNnacYENf";

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: "3rem 1.25rem 5rem", maxWidth: "800px" }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/" style={{ color: "var(--text-dim)" }}>home</Link>
        <span style={{ color: "var(--border2)", margin: "0 6px" }}>/</span>
        <span style={{ color: "var(--accent)" }}>contact</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="section-label" style={{ marginBottom: "0.75rem" }}>Get in Touch</p>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-bright)",
            margin: "0 0 1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Contact Us
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-dim)", lineHeight: 1.8, margin: 0, maxWidth: "560px" }}>
          We&apos;re a small, open-source team. The fastest way to reach us depends on what you need.
          Pick the right channel below.
        </p>
      </div>

      {/* Contact cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "12px",
          marginBottom: "3rem",
        }}
      >
        <ContactCard
          emoji="🐛"
          title="Report a Bug / Broken API"
          description="Found an API with a wrong URL, outdated info, or a site bug?"
          label="Open GitHub Issue"
          href={`${GITHUB_URL}/issues/new?template=bug-report.md`}
          external
        />
        <ContactCard
          emoji="➕"
          title="Suggest an API"
          description="Know a free API that should be listed here? Submit it."
          label="Suggest on GitHub"
          href={`${GITHUB_URL}/issues/new?template=suggest-api.md`}
          external
        />
        <ContactCard
          emoji="💬"
          title="Community & Chat"
          description="Join our Discord for dev discussions, feedback, and announcements."
          label="Join Discord"
          href={DISCORD_URL}
          external
        />
        <ContactCard
          emoji="✉️"
          title="Email Us"
          description="For partnerships, AdSense queries, legal, or anything else."
          label={CONTACT_EMAIL}
          href={`mailto:${CONTACT_EMAIL}`}
          external={false}
        />
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

      {/* Email details */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--accent)",
            margin: "0 0 1rem",
          }}
        >
          // Email
        </h2>
        <p style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1rem" }}>
          For the following topics, please email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
            {CONTACT_EMAIL}
          </a>
          :
        </p>
        <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
          {[
            "Partnership and sponsorship inquiries",
            "Advertising and Google AdSense related queries",
            "DMCA or copyright concerns",
            "Privacy Policy / Terms of Service questions",
            "Press and media inquiries",
            "Any other matter not covered by GitHub issues",
          ].map((item) => (
            <li key={item} style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "0.2rem" }}>
              {item}
            </li>
          ))}
        </ul>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginTop: "1rem", lineHeight: 1.7 }}>
          We typically respond within <strong style={{ color: "var(--text)" }}>2–5 business days</strong>.
          For faster responses on technical issues, GitHub is preferred.
        </p>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

      {/* GitHub */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--accent)",
            margin: "0 0 1rem",
          }}
        >
          // GitHub
        </h2>
        <p style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
          GitHub is the best place for technical contributions, API suggestions, and bug reports.
          It keeps everything public and trackable.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            ★ Star the Repo
          </a>
          <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View All Issues
          </a>
          <a href={`${GITHUB_URL}/pulls`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Open a Pull Request
          </a>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

      {/* Info box */}
      <div
        style={{
          background: "rgba(0,229,160,0.04)",
          border: "1px solid rgba(0,229,160,0.15)",
          borderRadius: "10px",
          padding: "1.25rem 1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            color: "var(--accent)",
            margin: "0 0 0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Response Time
        </p>
        <p style={{ color: "var(--text-dim)", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
          This is an open-source project maintained by a small team. We do our best to respond
          promptly but cannot guarantee a specific response time. GitHub issues are monitored
          more actively than email.
        </p>
      </div>

    </div>
  );
}

function ContactCard({
  emoji,
  title,
  description,
  label,
  href,
  external,
}: {
  emoji: string;
  title: string;
  description: string;
  label: string;
  href: string;
  external: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>{emoji}</span>
      <div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text-bright)",
            margin: "0 0 0.35rem",
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.6, margin: 0 }}>
          {description}
        </p>
      </div>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ fontSize: "0.8rem", marginTop: "auto", justifyContent: "center" }}
        >
          {label} ↗
        </a>
      ) : (
        <a
          href={href}
          className="btn btn-outline"
          style={{ fontSize: "0.8rem", marginTop: "auto", justifyContent: "center" }}
        >
          {label}
        </a>
      )}
    </div>
  );
}
