import Link from "next/link";
import { ApiIndex, getCategoryEmoji } from "@/lib/types";

interface ApiCardProps {
  api: ApiIndex;
  compact?: boolean;
}

export default function ApiCard({ api, compact = false }: ApiCardProps) {
  const authColor =
    api.auth === "No"
      ? "badge-green"
      : api.auth === "apiKey"
      ? "badge-blue"
      : api.auth === "OAuth"
      ? "badge-yellow"
      : "badge-gray";

  return (
    <Link
      href={`/api/${api.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        className="card card-accent"
        style={{
          padding: compact ? "1rem" : "1.25rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          cursor: "pointer",
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
              <span style={{ fontSize: "0.85rem" }}>{getCategoryEmoji(api.category)}</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: compact ? "0.9rem" : "0.95rem",
                  fontWeight: 600,
                  color: "var(--text-bright)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {api.name}
              </h3>
            </div>
            {!compact && (
              <p
                style={{
                  margin: 0,
                  fontSize: "0.825rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {api.description}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "auto" }}>
          <span className={`badge ${authColor}`}>
            {api.auth === "No" ? "No Auth" : api.auth}
          </span>
          <span className={`badge ${api.https ? "badge-green" : "badge-red"}`}>
            {api.https ? "HTTPS" : "HTTP"}
          </span>
          <span className={`badge ${api.cors ? "badge-green" : "badge-red"}`}>
            CORS: {api.cors ? "Yes" : "No"}
          </span>
          <span className="badge badge-gray" style={{ marginLeft: "auto" }}>
            {api.category}
          </span>
        </div>
      </article>
    </Link>
  );
}
