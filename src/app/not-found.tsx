import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        padding: "6rem 1.25rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "6rem",
          fontWeight: 700,
          color: "var(--border2)",
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.25rem",
          color: "var(--text-bright)",
          margin: 0,
        }}
      >
        Page not found
      </h1>
      <p style={{ color: "var(--text-dim)", margin: 0, maxWidth: "400px" }}>
        The API or page you&apos;re looking for doesn&apos;t exist yet. It might be
        added soon — suggest it on GitHub!
      </p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
        <Link href="/" className="btn btn-accent">
          ← Back to Home
        </Link>
        <Link href="/finder" className="btn btn-outline">
          Browse all APIs
        </Link>
        <a
          href="https://github.com/Hack-Orbit-global/free-api-world/issues/new?template=suggest-api.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          + Suggest API
        </a>
      </div>
    </div>
  );
}
