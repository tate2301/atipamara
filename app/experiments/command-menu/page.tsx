"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Metadata } from "next";

type CmdItem = { label: string; hint: string; group: string; action?: () => void };

const COMMANDS: CmdItem[] = [
  { label: "Go to home", hint: "navigate", group: "Navigation", action: () => { window.location.href = "/"; } },
  { label: "Magnetic Button experiment", hint: "experiment", group: "Experiments", action: () => { window.location.href = "/experiments/magnetic-button"; } },
  { label: "Animated Counter experiment", hint: "experiment", group: "Experiments", action: () => { window.location.href = "/experiments/animated-counter"; } },
  { label: "Image Stack experiment", hint: "experiment", group: "Experiments", action: () => { window.location.href = "/experiments/image-stack"; } },
  { label: "Open GitHub", hint: "↗", group: "Links", action: () => { window.open("https://github.com/tate2301", "_blank"); } },
  { label: "Open X / Twitter", hint: "↗", group: "Links", action: () => { window.open("https://twitter.com/atipamara", "_blank"); } },
  { label: "Switch to dark mode", hint: "theme", group: "Settings", action: () => { document.documentElement.setAttribute("data-theme", "dark"); localStorage.setItem("theme", "dark"); } },
  { label: "Switch to light mode", hint: "theme", group: "Settings", action: () => { document.documentElement.setAttribute("data-theme", "light"); localStorage.setItem("theme", "light"); } },
];

function fuzzyMatch(str: string, q: string) {
  if (!q) return true;
  let si = 0;
  for (const ch of q.toLowerCase()) {
    const i = str.toLowerCase().indexOf(ch, si);
    if (i === -1) return false;
    si = i + 1;
  }
  return true;
}

export default function CommandMenuPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((c) => fuzzyMatch(c.label, query));

  useEffect(() => { setSel(0); }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { filtered[sel]?.action?.(); setOpen(false); }
  };

  const groups: Record<string, CmdItem[]> = {};
  for (const item of filtered) {
    (groups[item.group] = groups[item.group] ?? []).push(item);
  }
  let gi = -1;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "var(--font-sans)", position: "relative" }}>
      <div style={{ position: "absolute", top: "24px", right: "24px" }}><ThemeToggle /></div>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--fg-subtle)", marginBottom: "12px" }}>Experiment</p>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "var(--fg)", marginBottom: "8px" }}>Command Menu</h1>
        <p style={{ fontSize: "15px", color: "var(--fg-muted)" }}>
          Press <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "12px", padding: "2px 6px", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--fg-muted)" }}>⌘K</kbd> to open — fuzzy search, arrow keys, Enter to run
        </p>
      </div>
      <button
        onClick={() => { setOpen(true); setQuery(""); }}
        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--fg-muted)", fontSize: "14px", cursor: "pointer", minWidth: "260px", boxShadow: "var(--shadow-sm)", fontFamily: "var(--font-sans)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
        <span style={{ flex: 1, textAlign: "left" }}>Search or run a command…</span>
        <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "3px", padding: "1px 5px" }}>⌘K</kbd>
      </button>
      <Link href="/" style={{ marginTop: "48px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)", textDecoration: "none" }}>← Back</Link>

      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "18vh", zIndex: 50 }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", width: "100%", maxWidth: "480px", margin: "0 16px", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search…"
                style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "15px", color: "var(--fg)", fontFamily: "var(--font-sans)" }}
              />
              <button onClick={() => setOpen(false)} style={{ background: "none", cursor: "pointer", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)", fontSize: "10.5px", padding: "2px 5px", borderRadius: "3px", border: "1px solid var(--border)" }}>ESC</button>
            </div>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <p style={{ padding: "24px 16px", textAlign: "center", fontSize: "14px", color: "var(--fg-subtle)" }}>No results</p>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--fg-subtle)", padding: "8px 12px 4px" }}>{group}</div>
                    {items.map((item) => {
                      gi++;
                      const idx = gi;
                      return (
                        <button
                          key={item.label}
                          onClick={() => { item.action?.(); setOpen(false); }}
                          onMouseEnter={() => setSel(idx)}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 12px", background: sel === idx ? "var(--bg-subtle)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "var(--fg)", fontSize: "14px", fontFamily: "var(--font-sans)" }}
                        >
                          <span>{item.label}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)" }}>{item.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
