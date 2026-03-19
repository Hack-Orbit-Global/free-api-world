"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface ApiEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
}

export default function SearchBar({ apis }: { apis: ApiEntry[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = apis
      .filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
    setResults(filtered);
    setOpen(filtered.length > 0);
    setSelected(-1);
  }, [query, apis]);

  // Keyboard shortcut: /
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, -1));
    } else if (e.key === "Enter") {
      if (selected >= 0 && results[selected]) {
        router.push(`/api/${results[selected].slug}`);
        setOpen(false);
        setQuery("");
      }
    }
  };

  const handleSelect = (slug: string) => {
    router.push(`/api/${slug}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "var(--surface)",
          border: `1px solid ${open ? "var(--accent)" : "var(--border2)"}`,
          borderRadius: "10px",
          padding: "0 16px",
          height: "52px",
          gap: "10px",
          boxShadow: open ? "0 0 0 3px rgba(0,229,160,0.1)" : "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search 10,000+ free APIs..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            color: "var(--text-bright)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          aria-label="Search APIs"
          aria-autocomplete="list"
          aria-expanded={open}
          role="combobox"
        />
        <kbd
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "var(--text-dim)",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "2px 6px",
            opacity: query ? 0 : 0.8,
            transition: "opacity 0.15s",
          }}
        >
          /
        </kbd>
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "var(--surface)",
            border: "1px solid var(--border2)",
            borderRadius: "10px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            overflow: "hidden",
            zIndex: 200,
          }}
        >
          {results.map((api, i) => (
            <button
              key={api.slug}
              role="option"
              aria-selected={i === selected}
              onClick={() => handleSelect(api.slug)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: i === selected ? "rgba(0,229,160,0.06)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.1s",
              }}
              onMouseEnter={() => setSelected(i)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-bright)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {api.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginLeft: "8px" }}>
                  {api.category}
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>
                {api.description}
              </span>
            </button>
          ))}
          <div style={{ padding: "8px 14px", borderTop: "1px solid var(--border)", fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "'JetBrains Mono', monospace" }}>
            ↑↓ navigate · Enter select · Esc close
          </div>
        </div>
      )}
    </div>
  );
}
