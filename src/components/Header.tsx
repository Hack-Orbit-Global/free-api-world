import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            {"{ "}
            <span style={{ color: "var(--text-bright)" }}>FreeAPIWorld</span>
            {" }"}
          </span>
        </Link>

        {/* Nav — CSS hover only, no event handlers */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Link href="/finder" className="nav-link">API Finder</Link>
          <Link href="/category/weather" className="nav-link">Browse</Link>
          <a
            href="https://github.com/Hack-Orbit-Global/free-api-world"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
          >
            ★ GitHub
          </a>
        </nav>
      </div>
      <div className="glow-line" />
    </header>
  );
}
