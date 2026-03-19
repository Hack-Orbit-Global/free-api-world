"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ApiIndex, getCategoryEmoji, categoryToSlug } from "@/lib/types";

const PAGE_SIZE = 24;

interface Props {
  apis: ApiIndex[];
}

const ALL = "All";

export default function FinderClient({ apis }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [auth, setAuth] = useState(ALL);
  const [httpsOnly, setHttpsOnly] = useState(false);
  const [corsOnly, setCorsOnly] = useState(false);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(apis.map((a) => a.category))).sort();
    return [ALL, ...cats];
  }, [apis]);

  const authTypes = useMemo(() => {
    const types = Array.from(new Set(apis.map((a) => a.auth))).sort();
    return [ALL, ...types];
  }, [apis]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return apis.filter((api) => {
      if (q && !api.name.toLowerCase().includes(q) && !api.description.toLowerCase().includes(q) && !api.category.toLowerCase().includes(q)) return false;
      if (category !== ALL && api.category !== category) return false;
      if (auth !== ALL && api.auth !== auth) return false;
      if (httpsOnly && !api.https) return false;
      if (corsOnly && !api.cors) return false;
      return true;
    });
  }, [apis, query, category, auth, httpsOnly, corsOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setQuery("");
    setCategory(ALL);
    setAuth(ALL);
    setHttpsOnly(false);
    setCorsOnly(false);
    setPage(1);
  };

  const hasFilters = query || category !== ALL || auth !== ALL || httpsOnly || corsOnly;

  return (
    <div className="container" style={{ padding: "2rem 1.25rem 4rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "var(--text-bright)",
            margin: "0 0 0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          API Finder
        </h1>
        <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.9rem" }}>
          Filter {apis.length}+ free public APIs by category, auth, HTTPS, and CORS support.
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: "8px", padding: "0 14px", height: "44px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by name, category, or description..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "0.9rem", color: "var(--text-bright)", fontFamily: "'DM Sans', sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", fontSize: "1.1rem", lineHeight: 1, padding: 0 }}>×</button>
          )}
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {/* Category */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "160px", flex: "1 1 160px" }}>
            <label style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              style={{ background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: "6px", color: "var(--text)", padding: "6px 10px", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === ALL ? "All Categories" : `${getCategoryEmoji(c)} ${c}`}
                </option>
              ))}
            </select>
          </div>

          {/* Auth */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "140px", flex: "1 1 140px" }}>
            <label style={{ fontSize: "0.7rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Auth Type
            </label>
            <select
              value={auth}
              onChange={(e) => { setAuth(e.target.value); setPage(1); }}
              style={{ background: "var(--bg)", border: "1px solid var(--border2)", borderRadius: "6px", color: "var(--text)", padding: "6px 10px", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
            >
              {authTypes.map((a) => (
                <option key={a} value={a}>
                  {a === ALL ? "All Auth Types" : a === "No" ? "No Auth Required" : a}
                </option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "18px" }}>
            <Toggle label="HTTPS Only" checked={httpsOnly} onChange={(v) => { setHttpsOnly(v); setPage(1); }} />
            <Toggle label="CORS: Yes" checked={corsOnly} onChange={(v) => { setCorsOnly(v); setPage(1); }} />
          </div>

          {hasFilters && (
            <button
              onClick={resetFilters}
              style={{ marginLeft: "auto", background: "none", border: "1px solid var(--border2)", borderRadius: "6px", color: "var(--text-dim)", fontSize: "0.8rem", padding: "6px 12px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", marginTop: "18px" }}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Results header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "8px" }}>
        <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--text-dim)" }}>
          {filtered.length === apis.length
            ? `Showing all ${apis.length} APIs`
            : `${filtered.length} APIs match your filters`}
        </p>
        {totalPages > 1 && (
          <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--text-dim)" }}>
            Page {page} / {totalPages}
          </p>
        )}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-dim)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.5rem", marginBottom: "0.5rem" }}>¯\_(ツ)_/¯</p>
          <p style={{ margin: "0 0 1rem" }}>No APIs match your filters.</p>
          <button onClick={resetFilters} className="btn btn-outline">Clear filters</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px", marginBottom: "2rem" }}>
          {paginated.map((api) => (
            <Link key={api.slug} href={`/api/${api.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <article className="card card-accent" style={{ padding: "1.1rem", height: "100%", display: "flex", flexDirection: "column", gap: "8px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.85rem" }}>{getCategoryEmoji(api.category)}</span>
                  <h3 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "var(--text-bright)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>
                    {api.name}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {api.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto" }}>
                  <span className={`badge ${api.auth === "No" ? "badge-green" : "badge-blue"}`} style={{ fontSize: "0.65rem" }}>
                    {api.auth === "No" ? "No Auth" : api.auth}
                  </span>
                  <span className={`badge ${api.https ? "badge-green" : "badge-red"}`} style={{ fontSize: "0.65rem" }}>
                    {api.https ? "HTTPS" : "HTTP"}
                  </span>
                  <span className={`badge ${api.cors ? "badge-green" : "badge-red"}`} style={{ fontSize: "0.65rem" }}>
                    CORS: {api.cors ? "Yes" : "No"}
                  </span>
                  <Link
                    href={`/category/${categoryToSlug(api.category)}`}
                    className="badge badge-gray"
                    style={{ marginLeft: "auto", fontSize: "0.65rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {api.category}
                  </Link>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
            disabled={page === 1}
            className="page-link"
            style={{ opacity: page === 1 ? 0.4 : 1 }}
          >
            ←
          </button>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo(0, 0); }}
              className={`page-link${p === page ? " active" : ""}`}
            >
              {p}
            </button>
          ))}
          {totalPages > 10 && <span style={{ color: "var(--text-dim)", padding: "0 4px", lineHeight: "36px" }}>…</span>}
          <button
            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
            disabled={page === totalPages}
            className="page-link"
            style={{ opacity: page === totalPages ? 0.4 : 1 }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: "36px",
          height: "20px",
          borderRadius: "100px",
          background: checked ? "var(--accent)" : "var(--border2)",
          position: "relative",
          transition: "background 0.15s",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <div style={{
          position: "absolute",
          top: "2px",
          left: checked ? "18px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: checked ? "var(--bg)" : "var(--text-dim)",
          transition: "left 0.15s",
        }} />
      </div>
      <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>{label}</span>
    </label>
  );
}
