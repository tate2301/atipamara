"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════
   TYPES & DATA
════════════════════════════════════════════ */
type ExpId =
  | "var-font" | "bento" | "scroll-progress" | "spring-btn"
  | "cursor-trail" | "tilt-card" | "cmd" | "mag"
  | "cnt" | "stk" | "noise-btn" | "scramble" | "abb" | "seg-ctrl";

type Exp = {
  id: ExpId;
  name: string;
  date: string;
  tags: string;
  desc: string;
  detail: string;
};

const EXPS: Exp[] = [
  {
    id: "var-font",
    name: "Variable Font Morph",
    date: "Mar 2025",
    tags: "typography · CSS",
    desc: "Font weight and width axes animate on hover, morphing between states.",
    detail: "A single word rendered with a variable font. On hover, the weight axis slides from 300 to 800 — the text visibly breathes. The easing curve overshoots slightly before settling, giving it physical weight. Built entirely with font-variation-settings and a CSS transition. Drag the slider to explore the weight axis manually.",
  },
  {
    id: "bento",
    name: "Bento Grid",
    date: "Feb 2025",
    tags: "layout · CSS Grid",
    desc: "An asymmetric feature grid where each card has its own personality.",
    detail: "Five cards in a CSS Grid layout — one large hero card, two medium, two small. Each has a different internal layout. The grid gaps are intentionally uneven. Cards lift with a box-shadow on hover. Resize the window and the grid reflows at defined breakpoints using named grid areas.",
  },
  {
    id: "scroll-progress",
    name: "Scroll-Linked Progress",
    date: "Jan 2025",
    tags: "scroll · animation",
    desc: "A reading progress bar driven by scroll position — zero JS in the CSS version.",
    detail: "A 3px bar at the top of a scrollable container fills as you scroll. The pure-CSS version uses animation-timeline: scroll() — no scroll event listeners, no requestAnimationFrame. The demo uses a JS fallback for cross-browser support.",
  },
  {
    id: "spring-btn",
    name: "Spring Physics Button",
    date: "Dec 2024",
    tags: "physics · spring · press",
    desc: "A button that compresses on press and bounces back with real spring physics.",
    detail: "On mousedown, the button squashes (scaleY 0.92, scaleX 1.04) like it has physical mass. On release, it springs back using a cubic-bezier that overshoots. The shadow deepens on press. No animation library — all cubic-bezier curves hand-tuned in CSS.",
  },
  {
    id: "cursor-trail",
    name: "Cursor Trail",
    date: "Nov 2024",
    tags: "cursor · canvas · motion",
    desc: "A trail of fading dots follows the cursor with spring lag between each node.",
    detail: "12 nodes, each following the previous with decreasing spring stiffness. The first node is tight, the last loose. Each is a circle on a canvas overlay — radius shrinking toward the tail, hue cycling slowly. Move your cursor around the panel.",
  },
  {
    id: "tilt-card",
    name: "Tilt Card",
    date: "Oct 2024",
    tags: "3D · perspective · mouse",
    desc: "A card that tilts in 3D toward the cursor, with a specular highlight that moves.",
    detail: "On mousemove, the card rotates up to 12° on X and Y axes. A radial gradient set to mix-blend-mode: overlay tracks the cursor, simulating a light source. On mouseleave, the card springs back to flat. The drop-shadow shifts based on tilt angle.",
  },
  {
    id: "cmd",
    name: "Command Menu",
    date: "Sep 2024",
    tags: "⌘K · keyboard · search",
    desc: "A ⌘K command palette with fuzzy search, grouped results, and keyboard navigation.",
    detail: "Press ⌘K to open. Type to filter — the fuzzy match doesn't require exact matches. Arrow keys navigate, Enter runs, Escape closes. Results are grouped. The backdrop blurs content behind. The palette animates in from below.",
  },
  {
    id: "mag",
    name: "Magnetic Button",
    date: "Aug 2024",
    tags: "cursor · physics · hover",
    desc: "A button that pulls toward the cursor with elastic spring return.",
    detail: "As the cursor approaches the button, it translates toward the cursor — up to 8px in any direction. The pull is proportional to distance from centre. On mouseleave, it springs back using cubic-bezier(.23,1,.32,1) with a slight overshoot.",
  },
  {
    id: "cnt",
    name: "Animated Counter",
    date: "Jul 2024",
    tags: "scroll · numbers · easing",
    desc: "Numbers count up from zero when scrolled into view, driven by easeOutCubic.",
    detail: "Three stats animate independently with a slight stagger. The easing is easeOutCubic — fast at the start, slowing into the final value. An IntersectionObserver triggers on first entry. A replay button resets and re-runs all three.",
  },
  {
    id: "stk",
    name: "Image Stack",
    date: "Jun 2024",
    tags: "hover · spring · avatars",
    desc: "Stacked avatar circles fan out on hover with a spring overshoot.",
    detail: "Four avatar circles overlapping at rest. On hover they fan out symmetrically — first rotates left, last rotates right. The transition uses cubic-bezier(.34,1.56,.64,1), the spring with perceptible overshoot. On mouseleave they snap back.",
  },
  {
    id: "noise-btn",
    name: "Noise Button",
    date: "May 2024",
    tags: "texture · grain · shine",
    desc: "A button with SVG noise grain texture and a light-sweep on hover.",
    detail: "Two layered pseudo-elements: a fractal noise SVG filter (mix-blend-mode: overlay) adds grain that makes the surface feel physical. On hover, a diagonal gradient animates from right to left, simulating a light sweep. The combination Vercel and Linear use on premium CTAs.",
  },
  {
    id: "scramble",
    name: "Text Scramble",
    date: "Apr 2024",
    tags: "text · random · hover",
    desc: "Characters cycle through random glyphs before resolving, left to right.",
    detail: "On hover, each character cycles through random alphanumerics at ~30fps. Characters resolve left to right — leftmost locks in first. The effect feels like a terminal decoding a message. The iteration speed is fractional so the decoding isn't perfectly mechanical.",
  },
  {
    id: "abb",
    name: "Apple Bottom Bar",
    date: "Mar 2024",
    tags: "blur · glass · iOS",
    desc: "Recreation of the frosted-glass pill from the iPhone 15 marketing page.",
    detail: "A rounded pill with backdrop-filter: blur(20px), semi-transparent background, and a subtle white border. The blur radius and opacity are calibrated to match Apple's implementation — most copies get the opacity wrong (too high) or the border wrong (too visible).",
  },
  {
    id: "seg-ctrl",
    name: "Segmented Control",
    date: "Feb 2024",
    tags: "selection · spring · indicator",
    desc: "A pill indicator slides between segments with a spring that slightly overshoots.",
    detail: "Three segments: Design, Code, Ship. A white pill indicator slides under the active segment using cubic-bezier(.34,1.1,.64,1) — just enough overshoot to feel lively. The indicator width morphs to match each button's width.",
  },
];

/* ════════════════════════════════════════════
   DEMO COMPONENTS
════════════════════════════════════════════ */

/* ── Variable Font Morph ─────────────────── */
function VarFontDemo() {
  const [weight, setWeight] = useState(300);
  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px" }}>
      <span className="exp-demo-label">variable font</span>
      <div
        style={{ fontVariationSettings: `'wght' ${weight}`, fontSize: "40px", fontFamily: "var(--font-sans)", letterSpacing: "-.02em", color: "var(--fg)", cursor: "default", userSelect: "none", transition: "font-variation-settings 400ms cubic-bezier(.34,1.3,.64,1)" }}
        onMouseEnter={() => setWeight(800)}
        onMouseLeave={() => setWeight(300)}
      >
        CORELITH
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <input
          type="range" min="100" max="900" step="10" value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          style={{ width: "180px", accentColor: "var(--accent)" }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)" }}>wght: {weight}</span>
      </div>
    </div>
  );
}

/* ── Bento Grid ──────────────────────────── */
function BentoDemo() {
  const card = (style?: React.CSSProperties) => ({
    padding: "16px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    background: "var(--bg-subtle)",
    transition: "box-shadow 140ms ease, transform 140ms ease",
    ...style,
  });
  const lift = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.cssText += ";box-shadow:var(--shadow-md);transform:translateY(-2px)";
  };
  const drop = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = "";
    (e.currentTarget as HTMLElement).style.transform = "";
  };

  return (
    <div className="exp-demo" style={{ padding: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", width: "100%", maxWidth: "280px" }}>
        <div style={{ ...card(), gridColumn: "span 2" }} onMouseEnter={lift} onMouseLeave={drop}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "36px", fontWeight: 500, color: "var(--fg)", lineHeight: 1 }}>3</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--fg-subtle)", marginTop: "4px" }}>companies in production</div>
        </div>
        <div style={card()} onMouseEnter={lift} onMouseLeave={drop}>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--fg)", marginBottom: "6px" }}>Huchu</div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "1px 5px", borderRadius: "2px", color: "var(--green)", background: "var(--green-bg)" }}>production</span>
        </div>
        <div style={card()} onMouseEnter={lift} onMouseLeave={drop}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--fg-muted)", lineHeight: 1.6 }}>&ldquo;The best way to learn a system is to build it yourself.&rdquo;</div>
        </div>
      </div>
    </div>
  );
}

/* ── Scroll Progress ─────────────────────── */
function ScrollProgressDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  const paragraphs = [
    "Scroll down to see the progress bar fill. The CSS-only version uses animation-timeline: scroll() — no event listeners needed.",
    "Every word counts. Specific, not impressive. The bar at the top tracks exactly how far you've read.",
    "Built to understand every layer of what we ship. Deployment, database, observability — the parts most engineers leave to someone else.",
    "Three companies currently run software built from scratch. The stakes are real. The code runs in production.",
    "The best way to learn a system is to build it yourself. Then ship it. Then maintain it.",
    "I grew up in Zimbabwe writing code for fun. Fifteen years later the fun hasn't stopped.",
  ];

  return (
    <div ref={containerRef} className="exp-demo" style={{ padding: 0, overflowY: "auto", flexDirection: "column", alignItems: "stretch" }} onScroll={onScroll}>
      <div style={{ position: "sticky", top: 0, height: "3px", background: "var(--border)", zIndex: 10, flexShrink: 0 }}>
        <div style={{ height: "100%", background: "var(--accent)", width: `${pct}%`, transition: "width 0ms" }} />
      </div>
      <div style={{ padding: "20px", flexShrink: 0 }}>
        <span className="exp-demo-label" style={{ position: "static", marginBottom: "16px", display: "block" }}>scroll progress</span>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.8, marginBottom: "14px" }}>{p}</p>
        ))}
      </div>
    </div>
  );
}

/* ── Spring Physics Button ───────────────── */
function SpringBtnDemo() {
  const [flashing, setFlashing] = useState(false);
  const flash = () => { setFlashing(true); setTimeout(() => setFlashing(false), 300); };

  return (
    <div className="exp-demo" style={{ position: "relative" }}>
      <span className="exp-demo-label">spring physics</span>
      {flashing && (
        <div style={{ position: "absolute", inset: 0, borderRadius: "8px", background: "var(--accent-subtle)", animation: "d-pulse-flash 300ms ease-out forwards", pointerEvents: "none" }} />
      )}
      <button className="d-spring-btn" onClick={flash}>Press me</button>
    </div>
  );
}

/* ── Cursor Trail ────────────────────────── */
function CursorTrailDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const nodes = useRef(Array.from({ length: 12 }, () => ({ x: 0, y: 0 })));
  const active = useRef(false);
  const hue = useRef(220);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const N = nodes.current;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active.current) {
        N[0].x += (mouse.current.x - N[0].x) * 0.45;
        N[0].y += (mouse.current.y - N[0].y) * 0.45;
        for (let i = 1; i < N.length; i++) {
          const k = Math.max(0.1, 0.38 - i * 0.025);
          N[i].x += (N[i - 1].x - N[i].x) * k;
          N[i].y += (N[i - 1].y - N[i].y) * k;
        }
        hue.current = (hue.current + 0.4) % 360;
        for (let i = 0; i < N.length; i++) {
          const r = Math.max(1, (N.length - i) * 2.2);
          const a = ((N.length - i) / N.length) * 0.85;
          ctx.beginPath();
          ctx.arc(N[i].x, N[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.current + i * 4},70%,60%,${a})`;
          ctx.fill();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="exp-demo" style={{ padding: 0, position: "relative" }}>
      <span className="exp-demo-label" style={{ zIndex: 1 }}>cursor trail — move mouse here</span>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block", cursor: "none" }}
        onMouseEnter={() => { active.current = true; }}
        onMouseLeave={() => { active.current = false; }}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
          mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }}
      />
    </div>
  );
}

/* ── Tilt Card ───────────────────────────── */
function TiltCardDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hl, setHl] = useState({ x: 50, y: 50 });
  const [leaving, setLeaving] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setTilt({ x: (ny - 0.5) * -14, y: (nx - 0.5) * 14 });
    setHl({ x: nx * 100, y: ny * 100 });
    setLeaving(false);
  };

  const onLeave = () => { setTilt({ x: 0, y: 0 }); setLeaving(true); };

  return (
    <div className="exp-demo" style={{ perspective: "700px" }}>
      <span className="exp-demo-label">tilt card</span>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          width: "200px",
          padding: "24px",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          background: "var(--bg-card)",
          boxShadow: leaving ? "var(--shadow-md)" : `${-tilt.y * 0.6}px ${tilt.x * 0.6}px 24px rgba(0,0,0,.14)`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: leaving ? "transform 500ms cubic-bezier(.25,.46,.45,.94), box-shadow 500ms ease" : "none",
          position: "relative",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(circle at ${hl.x}% ${hl.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
            mixBlendMode: "overlay" as const,
            pointerEvents: "none",
            transition: leaving ? "opacity 300ms ease" : "none",
            opacity: leaving ? 0 : 1,
          }}
        />
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg)", marginBottom: "4px" }}>Tatenda Chinyamakobvu</p>
        <p style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>Full-stack engineer</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--fg-subtle)", marginTop: "12px" }}>Corelith · Zimbabwe</p>
      </div>
    </div>
  );
}

/* ── Command Menu ────────────────────────── */
type CmdItem = { label: string; hint: string; group: string };
const CMD_ITEMS: CmdItem[] = [
  { label: "Go to home", hint: "navigate", group: "Navigation" },
  { label: "Open GitHub", hint: "↗", group: "Links" },
  { label: "Open X / Twitter", hint: "↗", group: "Links" },
  { label: "Magnetic Button", hint: "experiment", group: "Experiments" },
  { label: "Animated Counter", hint: "experiment", group: "Experiments" },
  { label: "Switch to dark mode", hint: "theme", group: "Settings" },
];
function fuzzyMatch(s: string, q: string) {
  if (!q) return true;
  let si = 0;
  for (const ch of q.toLowerCase()) {
    const i = s.toLowerCase().indexOf(ch, si);
    if (i === -1) return false;
    si = i + 1;
  }
  return true;
}

function CmdDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CMD_ITEMS.filter((c) => fuzzyMatch(c.label, query));
  useEffect(() => { setSel(0); }, [query]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);

  const groups: Record<string, CmdItem[]> = {};
  for (const item of filtered) (groups[item.group] = groups[item.group] ?? []).push(item);
  let gi = -1;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="exp-demo">
      <span className="exp-demo-label">command palette</span>
      <button className="d-cmd-trigger" onClick={() => { setOpen(true); setQuery(""); }}>
        <span>Search or run a command…</span>
        <kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="mini-palette open">
          <button className="mini-close" onClick={() => setOpen(false)}>✕</button>
          <div className="mini-input-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input ref={inputRef} className="mini-input" placeholder="Type to filter…" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKey} />
          </div>
          <div className="mini-results">
            {filtered.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", fontSize: "13px", color: "var(--fg-subtle)" }}>No results</div>
            ) : (
              Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="mini-group">{group}</div>
                  {items.map((item) => { gi++; const idx = gi; return (
                    <div key={item.label} className={`mini-item${sel === idx ? " sel" : ""}`} onMouseEnter={() => setSel(idx)} onClick={() => setOpen(false)}>
                      <span>{item.label}</span>
                      <span className="mini-item-hint">{item.hint}</span>
                    </div>
                  ); })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Magnetic Button ─────────────────────── */
function MagDemo() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.35, y: (e.clientY - (r.top + r.height / 2)) * 0.35 });
  };

  return (
    <div className="exp-demo" onMouseMove={onMove} onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovering(false); }}>
      <span className="exp-demo-label">magnetic button</span>
      <button
        ref={btnRef}
        className="d-mag-btn"
        onMouseEnter={() => setHovering(true)}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hovering ? "transform 80ms linear" : "transform 400ms cubic-bezier(.23,1,.32,1)",
        }}
      >
        Pull me
      </button>
    </div>
  );
}

/* ── Animated Counter ────────────────────── */
function useCounter(target: number, dur: number, running: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!running) { setV(0); return; }
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, target, dur]);
  return v;
}

function CntDemo() {
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const replay = useCallback(() => { setRunning(false); setTimeout(() => setRunning(true), 50); }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRunning(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const a = useCounter(3, 1000, running);
  const b = useCounter(10, 1600, running);
  const c = useCounter(6, 1300, running);

  return (
    <div ref={ref} className="exp-demo" style={{ flexDirection: "column", gap: "24px" }}>
      <span className="exp-demo-label">animated counter</span>
      <div className="d-counters">
        {[{ v: a, l: "companies" }, { v: b, l: "open-source ★" }, { v: c, l: "yrs building" }].map(({ v, l }) => (
          <div key={l} className="d-counter">
            <div className="d-counter-val">{v}</div>
            <div className="d-counter-lbl">{l}</div>
          </div>
        ))}
      </div>
      <button className="d-counter-replay" onClick={replay}>↺ replay</button>
    </div>
  );
}

/* ── Image Stack ─────────────────────────── */
function StkDemo() {
  const [spread, setSpread] = useState(false);
  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "16px" }}>
      <span className="exp-demo-label">image stack</span>
      <div className={`d-stack${spread ? " spread" : ""}`} onClick={() => setSpread((v) => !v)}>
        {["🧑‍💻", "👩‍🎨", "🧑‍🔬", "👨‍💼"].map((a, i) => <div key={i} className="d-stack-img">{a}</div>)}
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", marginTop: "12px" }}>
        click to {spread ? "collapse" : "spread"}
      </p>
    </div>
  );
}

/* ── Noise Button ────────────────────────── */
function NoiseBtnDemo() {
  return (
    <div className="exp-demo">
      <span className="exp-demo-label">noise button</span>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="exp-noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <button className="d-noise-btn">
        <div className="d-noise-btn-noise" style={{ filter: "url(#exp-noise-filter)" }} />
        <div className="d-noise-btn-shine" />
        <span style={{ position: "relative" }}>Hover me</span>
      </button>
    </div>
  );
}

/* ── Text Scramble ───────────────────────── */
function ScrambleDemo() {
  const TARGET = "CORELITH";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const [display, setDisplay] = useState(TARGET);
  const rafRef = useRef<number>();
  const t0 = useRef(0);
  const LOCK_DELAY = 65;
  const SCRAMBLE_DUR = 320;

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    t0.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0.current;
      let allDone = true;
      const result = TARGET.split("").map((ch, i) => {
        if (elapsed >= i * LOCK_DELAY + SCRAMBLE_DUR) return ch;
        allDone = false;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(result.join(""));
      if (!allDone) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(TARGET);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "24px" }}>
      <span className="exp-demo-label">text scramble</span>
      <div
        style={{ fontFamily: "var(--font-mono)", fontSize: "32px", fontWeight: 500, color: "var(--fg)", letterSpacing: ".04em", cursor: "default", userSelect: "none" }}
        onMouseEnter={scramble}
      >
        {display}
      </div>
      <button
        onClick={scramble}
        style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)", background: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}
      >
        ↺ scramble
      </button>
    </div>
  );
}

/* ── Apple Bottom Bar ────────────────────── */
function AbbDemo() {
  return (
    <div className="exp-demo">
      <span className="exp-demo-label">apple bottom bar</span>
      <div className="d-abb">
        <span className="d-abb-text">Learn more</span>
        <div className="d-abb-icon">⚡</div>
      </div>
    </div>
  );
}

/* ── Segmented Control ───────────────────── */
function SegCtrlDemo() {
  const [active, setActive] = useState(0);
  const btnsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState({ left: 3, width: 0 });
  const segments = ["Design", "Code", "Ship"];

  const updateInd = useCallback((idx: number) => {
    const btn = btnsRef.current[idx];
    if (!btn) return;
    setInd({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  useEffect(() => { const t = setTimeout(() => updateInd(0), 60); return () => clearTimeout(t); }, [updateInd]);
  useEffect(() => { updateInd(active); }, [active, updateInd]);

  return (
    <div className="exp-demo">
      <span className="exp-demo-label">segmented control</span>
      <div style={{ position: "relative", display: "inline-flex", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "8px", padding: "3px" }}>
        <div style={{
          position: "absolute", top: "3px", bottom: "3px",
          left: `${ind.left}px`, width: `${ind.width}px`,
          background: "var(--bg-card)", borderRadius: "5px",
          boxShadow: "var(--shadow-sm)",
          transition: "left 220ms cubic-bezier(.34,1.1,.64,1), width 220ms cubic-bezier(.34,1.1,.64,1)",
          pointerEvents: "none",
        }} />
        {segments.map((seg, i) => (
          <button
            key={seg}
            ref={(el) => { btnsRef.current[i] = el; }}
            onClick={() => setActive(i)}
            style={{
              position: "relative", zIndex: 1,
              padding: "7px 18px",
              background: "none", border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: "13px",
              color: active === i ? "var(--fg)" : "var(--fg-muted)",
              transition: "color 140ms ease",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            {seg}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CODE SNIPPETS
════════════════════════════════════════════ */
const CODE: Record<ExpId, string> = {
  "var-font": `<span class="cm">/* Animate weight axis on hover */</span>
.<span class="fn">word</span> {
  <span class="prop">font-variation-settings</span>: <span class="str">'wght'</span> <span class="kw">var</span>(--weight, <span class="num">300</span>);
  <span class="prop">transition</span>: font-variation-settings
    <span class="num">400ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.3</span>,.<span class="num">64</span>,<span class="num">1</span>);
}
.<span class="fn">word</span>:hover {
  --weight: <span class="num">800</span>;
}

<span class="cm">/* Or drive with JS for a range slider */</span>
<span class="kw">const</span> [weight, setWeight] = <span class="fn">useState</span>(<span class="num">300</span>)
style={{ fontVariationSettings: \`<span class="str">'wght' \${weight}</span>\` }}`,

  bento: `.<span class="fn">grid</span> {
  <span class="prop">display</span>: grid;
  <span class="prop">grid-template-columns</span>: <span class="num">1fr 1fr</span>;
  <span class="prop">grid-template-areas</span>:
    <span class="str">"hero hero"</span>
    <span class="str">"stat  quote"</span>
    <span class="str">"tags  location"</span>;
  <span class="prop">gap</span>: <span class="num">8px</span>;
}
.<span class="fn">hero</span> { <span class="prop">grid-area</span>: hero }

.<span class="fn">card</span>:hover {
  <span class="prop">box-shadow</span>: var(--shadow-md);
  <span class="prop">transform</span>: translateY(-<span class="num">2px</span>);
  <span class="prop">transition</span>: all <span class="num">140ms</span> ease;
}`,

  "scroll-progress": `<span class="cm">/* CSS-only — Scroll Timeline API */</span>
.<span class="fn">progress</span> {
  <span class="prop">animation</span>: fill linear;
  <span class="prop">animation-timeline</span>: <span class="fn">scroll</span>(nearest);
  <span class="prop">transform-origin</span>: left center;
}
@keyframes <span class="fn">fill</span> {
  <span class="kw">from</span> { transform: scaleX(<span class="num">0</span>) }
  <span class="kw">to</span>   { transform: scaleX(<span class="num">1</span>) }
}

<span class="cm">/* JS fallback for Safari */</span>
container.<span class="fn">addEventListener</span>(<span class="str">'scroll'</span>, () => {
  <span class="kw">const</span> p = el.scrollTop /
    (el.scrollHeight - el.clientHeight)
  bar.style.width = \`\${p * <span class="num">100</span>}%\`
})`,

  "spring-btn": `<span class="cm">/* Squash on press, spring on release */</span>
.<span class="fn">btn</span>:active {
  transform: scaleY(<span class="num">0.92</span>) scaleX(<span class="num">1.04</span>);
  transition: transform <span class="num">80ms</span> ease-in,
              box-shadow <span class="num">80ms</span> ease-in;
}
.<span class="fn">btn</span> {
  <span class="prop">transition</span>:
    transform <span class="num">500ms</span>
      cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>),
    box-shadow <span class="num">500ms</span>
      cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>);
}`,

  "cursor-trail": `<span class="cm">// 12 nodes with decreasing spring stiffness</span>
<span class="kw">const</span> N = nodes.current
N[<span class="num">0</span>].x += (mouse.x - N[<span class="num">0</span>].x) * <span class="num">0.45</span>
N[<span class="num">0</span>].y += (mouse.y - N[<span class="num">0</span>].y) * <span class="num">0.45</span>

<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i < N.length; i++) {
  <span class="kw">const</span> k = Math.<span class="fn">max</span>(<span class="num">0.1</span>, <span class="num">0.38</span> - i * <span class="num">0.025</span>)
  N[i].x += (N[i-<span class="num">1</span>].x - N[i].x) * k
  N[i].y += (N[i-<span class="num">1</span>].y - N[i].y) * k
}`,

  "tilt-card": `<span class="cm">// Map cursor position to rotation</span>
<span class="kw">const</span> nx = (clientX - rect.left) / rect.width
<span class="kw">const</span> ny = (clientY - rect.top) / rect.height
<span class="fn">setTilt</span>({
  x: (ny - <span class="num">0.5</span>) * -<span class="num">14</span>,
  y: (nx - <span class="num">0.5</span>) * <span class="num">14</span>,
})

<span class="cm">// Highlight tracks cursor</span>
style={{ background:
  \`radial-gradient(circle at
    \${nx * <span class="num">100</span>}% \${ny * <span class="num">100</span>}%,
    rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,<span class="num">0.4</span>) <span class="num">0</span>%,
    transparent <span class="num">65</span>%)\`,
  mixBlendMode: <span class="str">'overlay'</span> }}`,

  cmd: `<span class="cm">// Fuzzy match — typing "git" matches "Open GitHub"</span>
<span class="kw">function</span> <span class="fn">fuzzyMatch</span>(str: <span class="kw">string</span>, q: <span class="kw">string</span>) {
  <span class="kw">let</span> si = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> q.<span class="fn">toLowerCase</span>()) {
    <span class="kw">const</span> i = str.<span class="fn">toLowerCase</span>().<span class="fn">indexOf</span>(ch, si)
    <span class="kw">if</span> (i === -<span class="num">1</span>) <span class="kw">return false</span>
    si = i + <span class="num">1</span>
  }
  <span class="kw">return true</span>
}

<span class="cm">// Global ⌘K listener</span>
<span class="fn">useEffect</span>(() => {
  <span class="kw">const</span> h = (e: KeyboardEvent) => {
    <span class="kw">if</span> ((e.metaKey || e.ctrlKey) && e.key === <span class="str">'k'</span>)
      <span class="fn">setOpen</span>(<span class="kw">true</span>)
  }
  window.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>, h)
  <span class="kw">return</span> () => window.<span class="fn">removeEventListener</span>(<span class="str">'keydown'</span>, h)
}, [])`,

  mag: `<span class="cm">// Translate toward cursor centre</span>
<span class="kw">const</span> <span class="fn">onMove</span> = (e: MouseEvent) => {
  <span class="kw">const</span> r = ref.current!.<span class="fn">getBoundingClientRect</span>()
  <span class="kw">const</span> dx = e.clientX - (r.left + r.width / <span class="num">2</span>)
  <span class="kw">const</span> dy = e.clientY - (r.top + r.height / <span class="num">2</span>)
  <span class="fn">setPos</span>({ x: dx * <span class="num">0.35</span>, y: dy * <span class="num">0.35</span> })
}

style={{
  transform: \`translate(\${pos.x}px, \${pos.y}px)\`,
  transition: hovering
    ? <span class="str">'transform 80ms linear'</span>
    : <span class="str">'transform 400ms cubic-bezier(.23,1,.32,1)'</span>
}}`,

  cnt: `<span class="cm">// easeOutCubic counter via rAF</span>
<span class="kw">const</span> t0 = performance.<span class="fn">now</span>()
<span class="kw">const</span> <span class="fn">tick</span> = (now: <span class="kw">number</span>) => {
  <span class="kw">const</span> p = Math.<span class="fn">min</span>((now - t0) / dur, <span class="num">1</span>)
  <span class="fn">setVal</span>(Math.<span class="fn">round</span>(
    (<span class="num">1</span> - (<span class="num">1</span> - p) ** <span class="num">3</span>) * target
  ))
  <span class="kw">if</span> (p < <span class="num">1</span>) <span class="fn">requestAnimationFrame</span>(tick)
}
<span class="fn">requestAnimationFrame</span>(tick)`,

  stk: `<span class="cm">/* CSS drives all transforms */</span>
.<span class="fn">d-stack-img</span> {
  <span class="prop">transition</span>: transform <span class="num">320ms</span>
    cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>);
}
.<span class="fn">spread</span> :nth-child(<span class="num">1</span>) {
  transform: translateX(-<span class="num">24px</span>) rotate(-<span class="num">8deg</span>);
}
.<span class="fn">spread</span> :nth-child(<span class="num">2</span>) {
  transform: translateX(-<span class="num">8px</span>) rotate(-<span class="num">3deg</span>);
}

<span class="cm">// React toggles the class</span>
<span class="kw">const</span> [spread, setSpread] = <span class="fn">useState</span>(<span class="kw">false</span>)`,

  "noise-btn": `<span class="cm">/* Grain layer via SVG filter */</span>
&lt;filter id=<span class="str">"noise"</span>&gt;
  &lt;feTurbulence
    type=<span class="str">"fractalNoise"</span>
    baseFrequency=<span class="str">"0.65"</span>
    numOctaves=<span class="str">"3"</span> /&gt;
  &lt;feColorMatrix type=<span class="str">"saturate"</span> values=<span class="str">"0"</span> /&gt;
&lt;/filter&gt;

<span class="cm">/* Light sweep on hover */</span>
.<span class="fn">shine</span> {
  background: linear-gradient(<span class="num">105deg</span>,
    transparent <span class="num">30%</span>,
    rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">25</span>) <span class="num">50%</span>,
    transparent <span class="num">70%</span>);
  background-size: <span class="num">200%</span>;
}
.<span class="fn">btn</span>:hover .<span class="fn">shine</span> {
  background-position: -<span class="num">100%</span>;
}`,

  scramble: `<span class="cm">// Characters resolve left-to-right via rAF</span>
<span class="kw">const</span> CHARS = <span class="str">"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"</span>
<span class="kw">const</span> LOCK_DELAY = <span class="num">65</span> <span class="cm">// ms per character</span>

<span class="kw">const</span> <span class="fn">tick</span> = (now: <span class="kw">number</span>) => {
  <span class="kw">const</span> elapsed = now - t0.current
  <span class="kw">const</span> result = TARGET.<span class="fn">split</span>(<span class="str">""</span>).<span class="fn">map</span>((ch, i) => {
    <span class="kw">if</span> (elapsed >= i * LOCK_DELAY + <span class="num">320</span>)
      <span class="kw">return</span> ch <span class="cm">// locked</span>
    <span class="kw">return</span> CHARS[Math.<span class="fn">floor</span>(Math.<span class="fn">random</span>() * CHARS.length)]
  })
  <span class="fn">setDisplay</span>(result.<span class="fn">join</span>(<span class="str">""</span>))
}`,

  abb: `<span class="cm">/* Glass morphism */</span>
.<span class="fn">pill</span> {
  background: rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>, .<span class="num">75</span>);
  backdrop-filter: blur(<span class="num">20px</span>);
  -webkit-backdrop-filter: blur(<span class="num">20px</span>);
  border: <span class="num">1px</span> solid rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>, .<span class="num">5</span>);
  border-radius: <span class="num">100px</span>;
}
[data-theme=<span class="str">"dark"</span>] .<span class="fn">pill</span> {
  background: rgba(<span class="num">30</span>,<span class="num">30</span>,<span class="num">28</span>, .<span class="num">8</span>);
  border-color: rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>, .<span class="num">08</span>);
}`,

  "seg-ctrl": `<span class="cm">// Pill indicator tracks active button</span>
<span class="kw">const</span> <span class="fn">updateInd</span> = (idx: <span class="kw">number</span>) => {
  <span class="kw">const</span> btn = btnsRef.current[idx]
  <span class="kw">if</span> (!btn) <span class="kw">return</span>
  <span class="fn">setInd</span>({ left: btn.offsetLeft, width: btn.offsetWidth })
}

<span class="cm">/* CSS spring handles the slide */</span>
.<span class="fn">indicator</span> {
  <span class="prop">transition</span>:
    left <span class="num">220ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.1</span>,.<span class="num">64</span>,<span class="num">1</span>),
    width <span class="num">220ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.1</span>,.<span class="num">64</span>,<span class="num">1</span>);
}`,
};

const DEMOS: Record<ExpId, React.FC> = {
  "var-font": VarFontDemo,
  bento: BentoDemo,
  "scroll-progress": ScrollProgressDemo,
  "spring-btn": SpringBtnDemo,
  "cursor-trail": CursorTrailDemo,
  "tilt-card": TiltCardDemo,
  cmd: CmdDemo,
  mag: MagDemo,
  cnt: CntDemo,
  stk: StkDemo,
  "noise-btn": NoiseBtnDemo,
  scramble: ScrambleDemo,
  abb: AbbDemo,
  "seg-ctrl": SegCtrlDemo,
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Experiments() {
  const [active, setActive] = useState<ExpId>("var-font");
  const [view, setView] = useState<"demo" | "code">("demo");
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const switchTo = (id: ExpId) => {
    if (id === active) return;
    setFading(true);
    setTimeout(() => { setActive(id); setView("demo"); setFading(false); }, 140);
  };

  const current = EXPS.find((e) => e.id === active)!;
  const DemoComponent = DEMOS[active];

  return (
    <section id="exp-section" ref={sectionRef}>
      {/* sticky bar */}
      <div className="exp-bar">
        <div className="exp-bar-left">
          <span className="exp-bar-title">Experiments</span>
          <span className="exp-bar-count">{EXPS.length}</span>
        </div>
      </div>

      {/* mobile tabs */}
      <div className="exp-mobile-tabs">
        {EXPS.map((exp) => (
          <button
            key={exp.id}
            className={`exp-mobile-tab${active === exp.id ? " active" : ""}`}
            onClick={() => switchTo(exp.id)}
          >
            {exp.name}
          </button>
        ))}
      </div>

      {/* split */}
      <div className="exp-split">
        {/* list */}
        <div className="exp-list-col">
          {EXPS.map((exp, i) => (
            <div key={exp.id}>
              {i > 0 && <div className="exp-list-divider" />}
              <div
                className={`exp-list-item${active === exp.id ? " active" : ""}`}
                onClick={() => switchTo(exp.id)}
              >
                <div className="exp-list-inner">
                  <span className="exp-list-name">{exp.name}</span>
                  <span className="exp-list-meta">{exp.date}</span>
                </div>
                <span className="exp-list-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* panel */}
        <div className="exp-panel-col">
          <p style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
            {current.detail}
          </p>
          <div className="exp-toggle">
            <button
              className={`exp-toggle-btn${view === "demo" ? " active" : ""}`}
              onClick={() => setView("demo")}
            >
              Preview
            </button>
            <button
              className={`exp-toggle-btn${view === "code" ? " active" : ""}`}
              onClick={() => setView("code")}
            >
              Code
            </button>
          </div>
          <div className={`exp-card${fading ? " fade" : ""}`}>
            <div className={`exp-pane${view === "demo" ? " show" : ""}`}>
              <DemoComponent />
            </div>
            <div className={`exp-pane${view === "code" ? " show" : ""}`}>
              <div className="exp-code-pane">
                <div className="exp-code-inner" dangerouslySetInnerHTML={{ __html: CODE[active] }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
