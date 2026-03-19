import Link from "next/link";

const FOOTER_LINKS = {
  Community: [
    { label: "GitHub", href: "https://github.com/Hack-Orbit-Global/free-api-world" },
    { label: "Discord", href: "https://discord.gg/EDrN2fzqap" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/hackorbit/" },
  ],
  Explore: [
    { label: "All APIs", href: "/finder" },
    { label: "Weather APIs", href: "/category/weather" },
    { label: "Finance APIs", href: "/category/finance" },
    { label: "AI & ML APIs", href: "/category/ai-ml" },
  ],
  Contribute: [
    {
      label: "Suggest an API",
      href: "https://github.com/Hack-Orbit-Global/free-api-world/issues/new?template=suggest-api.md",
    },
    {
      label: "Report Issue",
      href: "https://github.com/Hack-Orbit-Global/free-api-world/issues/new?template=bug-report.md",
    },
    { label: "HackOrbit", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        marginTop: "80px",
      }}
    >
      <div className="glow-line" style={{ opacity: 0.5 }} />
      <div className="container">
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2.5rem",
            padding: "3rem 0 2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--accent)",
                marginBottom: "0.75rem",
              }}
            >
              {"{ FreeAPIWorld }"}
            </div>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              The universe of free public APIs. Built for developers, by developers.
              Part of the{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                Hack Orbit
              </a>{" "}
              ecosystem.
            </p>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "0.8rem",
                marginTop: "1rem",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Created by{" "}
              <a
                href="https://github.com/bariksabarna"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text)" }}
              >
                Sabarna Barik
              </a>
            </p>
          </div>

          {/* Link columns — CSS hover via .footer-link, no JS handlers */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p
                className="section-label"
                style={{ marginBottom: "1rem", color: "var(--text-dim)" }}
              >
                {section}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "0.5rem" }}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="footer-link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.25rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", margin: 0 }}>
            © {new Date().getFullYear()} FreeAPIWorld · Hack Orbit · MIT License
          </p>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.8rem",
              fontFamily: "'JetBrains Mono', monospace",
              margin: 0,
            }}
          >
            Build. Contribute. Orbit Together.
          </p>
        </div>
      </div>
    </footer>
  );
}
