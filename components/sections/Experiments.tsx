"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════
   TYPES & DATA
════════════════════════════════════════════ */
type ExpId =
  | "metaballs" | "rope" | "cursor-trail" | "tilt-card"
  | "mag" | "dock" | "island" | "drag" | "scramble";

type Exp = {
  id: ExpId;
  name: string;
  date: string;
  desc: string;
  detail: string;
};

const EXPS: Exp[] = [
  {
    id: "metaballs",
    name: "Metaballs",
    date: "Jun 2026",
    desc: "Organic blobs that merge as they approach — zero JS, pure CSS filter.",
    detail: "An SVG feColorMatrix threshold applied after a Gaussian blur makes separate circles appear to melt together. The math: blur spreads each shape's alpha channel, the threshold snaps it back to 0 or 1. The result is an organic boundary that looks like fluid surface tension. Drag the blobs.",
  },
  {
    id: "rope",
    name: "Rope Physics",
    date: "Jun 2026",
    desc: "A rope simulated with Verlet integration. Grab the end and throw it.",
    detail: "24 particles connected by distance constraints. Verlet integration gives each particle implicit velocity via position deltas — no velocity variable needed. 10 constraint iterations per frame keeps the rope inextensible without a stiff solver. Damping of 0.985 bleeds energy slowly. Drag the free end.",
  },
  {
    id: "cursor-trail",
    name: "Cursor Trail",
    date: "Nov 2024",
    desc: "A chain of 12 spring-linked nodes follows the cursor with decreasing stiffness.",
    detail: "Node 0 chases the cursor at 0.45 stiffness. Each subsequent node follows the previous at k = max(0.1, 0.38 − i × 0.025) — stiffness falls off with depth. The result is a whip-like motion: the head is tight, the tail loose. Hue cycles at 0.4°/frame. Move your cursor through the panel.",
  },
  {
    id: "tilt-card",
    name: "Tilt Card",
    date: "Oct 2024",
    desc: "A card that rotates toward the cursor in 3D, with a specular highlight tracking the light source.",
    detail: "Cursor position maps to rotateX/Y via (pos − 0.5) × 14°. A radial gradient set to mix-blend-mode: overlay follows the cursor — when it's in the top-left corner, the gradient simulates a light source from there. The shadow vector inverts with tilt angle. On mouseleave: spring back via CSS transition.",
  },
  {
    id: "mag",
    name: "Magnetic Button",
    date: "Aug 2024",
    desc: "The button pulls toward the cursor and springs back when you leave.",
    detail: "Displacement = (cursorPos − buttonCenter) × 0.35. Applied to the button during hover via 80ms linear — fast enough to feel live. On mouseleave: same displacement but 400ms cubic-bezier(.23,1,.32,1) — the classic overshoot spring. The 0.35 multiplier is the field strength; higher = more pull.",
  },
  {
    id: "dock",
    name: "macOS Dock",
    date: "Oct 2025",
    desc: "Gaussian distance falloff magnifies icons as the cursor approaches.",
    detail: "scale(i) = 1 + (maxScale − 1) × e^(−dist² / σ²). The Gaussian kernel means the icon directly under the cursor peaks at 1.8×, its neighbours at ~1.4×, two away at ~1.05×. σ = 55 controls the spread — higher σ makes the effect wider. On mouseleave, everything springs back with cubic-bezier(.34,1.2,.64,1).",
  },
  {
    id: "island",
    name: "Dynamic Island",
    date: "Sep 2025",
    desc: "Apple's pill morphs between five Live Activity states — one div, no clipping.",
    detail: "Width and height change on a single div with border-radius: 100px. The spring cubic-bezier(.34,1.15,.64,1) gives it just enough overshoot to feel physical. Content fades in 160ms after the morph starts — text never rides a distorting container. Five states: call, alarm, download, navigation, message.",
  },
  {
    id: "drag",
    name: "Drag to Dismiss",
    date: "Dec 2025",
    desc: "Pointer capture + velocity measurement dismisses the card on a fast flick.",
    detail: "setPointerCapture keeps tracking even when the cursor leaves the element. On release: if y > 80px OR velocity > 0.5px/ms, dismiss. Velocity is measured as Δy/Δt across the last two pointer events. A slow drag needs distance; a fast throw doesn't. This is the interaction model of every native bottom sheet.",
  },
  {
    id: "scramble",
    name: "Text Scramble",
    date: "Apr 2024",
    desc: "Characters cycle through random glyphs and resolve left to right.",
    detail: "Each character is locked when elapsed > (i × 65ms + 320ms). Before that it picks a random alphanumeric every rAF frame. The staggered lock delay (65ms per character) creates the left-to-right decode feel. The total scramble window is ~840ms for 8 characters. Hover to trigger.",
  },
];

/* ════════════════════════════════════════════
   DEMO COMPONENTS
════════════════════════════════════════════ */

/* ── Metaballs ───────────────────────────── */
type Blob = { x: number; y: number; r: number };

function MetaballsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([
    { x: 110, y: 140, r: 55 },
    { x: 195, y: 140, r: 48 },
    { x: 155, y: 88, r: 40 },
    { x: 248, y: 160, r: 36 },
  ]);
  const dragging = useRef<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current === null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setBlobs((prev) =>
      prev.map((b, i) =>
        i === dragging.current
          ? { ...b, x: e.clientX - rect.left - offset.current.x, y: e.clientY - rect.top - offset.current.y }
          : b,
      ),
    );
  };

  const onBlobDown = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragging.current = i;
    offset.current = { x: e.clientX - rect.left - blobs[i].x, y: e.clientY - rect.top - blobs[i].y };
  };

  return (
    <div className="exp-demo" style={{ padding: 0 }}>
      <span className="exp-demo-label">metaballs — drag blobs</span>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="gooey-filter" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        className="d-metaballs"
        style={{ filter: "url(#gooey-filter)" }}
        onMouseMove={onMouseMove}
        onMouseUp={() => { dragging.current = null; }}
        onMouseLeave={() => { dragging.current = null; }}
      >
        {blobs.map((b, i) => (
          <div
            key={i}
            className="d-metaball"
            style={{ width: b.r * 2, height: b.r * 2, left: b.x - b.r, top: b.y - b.r }}
            onMouseDown={(e) => onBlobDown(e, i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Rope Physics ────────────────────────── */
function RopeDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{ x: number; y: number; px: number; py: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, down: false });
  const rafRef = useRef<number>();
  const colorsRef = useRef({ fg: "#888", accent: "#C95C2A" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = 24;
    const REST = 11;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colorsRef.current.fg = s.getPropertyValue("--fg").trim() || "#1A1916";
      colorsRef.current.accent = s.getPropertyValue("--accent").trim() || "#C95C2A";
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const init = () => {
      const w = canvas.offsetWidth; const h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
      const pts = [];
      for (let i = 0; i < N; i++) { const y = 30 + i * REST; pts.push({ x: w / 2, y, px: w / 2, py: y }); }
      stateRef.current = pts;
    };
    init();

    const tick = () => {
      const pts = stateRef.current;
      if (!pts.length) { rafRef.current = requestAnimationFrame(tick); return; }
      const { down, x: mx, y: my } = mouseRef.current;
      const w = canvas.width; const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 1; i < N; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * 0.985; const vy = (p.y - p.py) * 0.985;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + 0.35;
        if (p.x < 2) p.x = 2;
        if (p.x > w - 2) p.x = w - 2;
        if (p.y > h - 2) { p.y = h - 2; p.py = p.y + vy * 0.3; }
      }
      if (down) { const l = pts[N - 1]; l.x = mx; l.y = my; l.px = mx; l.py = my; }
      for (let iter = 0; iter < 10; iter++) {
        pts[0].x = w / 2; pts[0].y = 30;
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i]; const b = pts[i + 1];
          const dx = b.x - a.x; const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const diff = (dist - REST) / dist * 0.5;
          if (i !== 0) { a.x += dx * diff; a.y += dy * diff; }
          b.x -= dx * diff; b.y -= dy * diff;
        }
        pts[0].x = w / 2; pts[0].y = 30;
        if (down) { const l = pts[N - 1]; l.x = mx; l.y = my; }
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < N - 1; i++) {
        const mx2 = (pts[i].x + pts[i + 1].x) / 2; const my2 = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx2, my2);
      }
      ctx.lineTo(pts[N - 1].x, pts[N - 1].y);
      const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[N - 1].x, pts[N - 1].y);
      grad.addColorStop(0, colorsRef.current.accent + "cc");
      grad.addColorStop(1, colorsRef.current.accent + "44");
      ctx.strokeStyle = grad; ctx.lineWidth = 2.5;
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
      ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, 5, 0, Math.PI * 2);
      ctx.fillStyle = colorsRef.current.fg; ctx.fill();
      ctx.beginPath(); ctx.arc(pts[N - 1].x, pts[N - 1].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colorsRef.current.accent; ctx.fill();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { mo.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="exp-demo" style={{ padding: 0, position: "relative" }}>
      <span className="exp-demo-label" style={{ zIndex: 1 }}>rope physics — drag end</span>
      <canvas
        ref={canvasRef}
        className="d-rope-canvas"
        style={{ width: "100%", height: "100%" }}
        onMouseMove={(e) => { const r = canvasRef.current?.getBoundingClientRect(); if (!r) return; mouseRef.current.x = e.clientX - r.left; mouseRef.current.y = e.clientY - r.top; }}
        onMouseDown={() => { mouseRef.current.down = true; }}
        onMouseUp={() => { mouseRef.current.down = false; }}
        onMouseLeave={() => { mouseRef.current.down = false; }}
      />
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
      canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (active.current) {
        N[0].x += (mouse.current.x - N[0].x) * 0.45;
        N[0].y += (mouse.current.y - N[0].y) * 0.45;
        for (let i = 1; i < N.length; i++) {
          const k = Math.max(0.1, 0.38 - i * 0.025);
          N[i].x += (N[i - 1].x - N[i].x) * k; N[i].y += (N[i - 1].y - N[i].y) * k;
        }
        hue.current = (hue.current + 0.4) % 360;
        for (let i = 0; i < N.length; i++) {
          const r = Math.max(1, (N.length - i) * 2.2);
          const a = ((N.length - i) / N.length) * 0.85;
          ctx.beginPath(); ctx.arc(N[i].x, N[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue.current + i * 4},70%,60%,${a})`; ctx.fill();
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
        onMouseMove={(e) => { const r = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }}
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
    const nx = (e.clientX - r.left) / r.width; const ny = (e.clientY - r.top) / r.height;
    setTilt({ x: (ny - 0.5) * -14, y: (nx - 0.5) * 14 }); setHl({ x: nx * 100, y: ny * 100 }); setLeaving(false);
  };

  return (
    <div className="exp-demo" style={{ perspective: "700px" }}>
      <span className="exp-demo-label">tilt card</span>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setLeaving(true); }}
        style={{
          width: "200px", padding: "24px",
          border: "1px solid var(--border)", borderRadius: "16px",
          background: "var(--bg-card)",
          boxShadow: leaving ? "var(--shadow-md)" : `${-tilt.y * 0.6}px ${tilt.x * 0.6}px 24px rgba(0,0,0,.14)`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: leaving ? "transform 500ms cubic-bezier(.25,.46,.45,.94), box-shadow 500ms ease" : "none",
          position: "relative", overflow: "hidden", cursor: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${hl.x}% ${hl.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`, mixBlendMode: "overlay" as const, pointerEvents: "none", transition: leaving ? "opacity 300ms ease" : "none", opacity: leaving ? 0 : 1 }} />
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--fg)", marginBottom: "4px" }}>Tatenda Chinyamakobvu</p>
        <p style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>Full-stack engineer</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--fg-subtle)", marginTop: "12px" }}>Corelith · Zimbabwe</p>
      </div>
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
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: hovering ? "transform 80ms linear" : "transform 400ms cubic-bezier(.23,1,.32,1)" }}
      >
        Pull me
      </button>
    </div>
  );
}

/* ── macOS Dock ──────────────────────────── */
function DockDemo() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ICONS = ["🏠", "⚡", "📁", "📸", "🎵", "⚙️", "🗑️"];
  const BASE = 36; const MAX_S = 1.8; const SIGMA = 55;
  const getScale = (idx: number): number => {
    if (mouseX === null || !containerRef.current) return 1;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + (idx + 0.5) * (rect.width / ICONS.length);
    const d = Math.abs(mouseX - cx);
    return 1 + (MAX_S - 1) * Math.exp(-(d * d) / (SIGMA * SIGMA));
  };
  return (
    <div className="exp-demo" style={{ justifyContent: "flex-end", paddingBottom: "16px" }}>
      <div ref={containerRef} className="d-dock" onMouseMove={(e) => setMouseX(e.clientX)} onMouseLeave={() => setMouseX(null)}>
        {ICONS.map((icon, i) => {
          const s = getScale(i);
          return (
            <div key={i} className="d-dock-icon" style={{ width: `${BASE}px`, height: `${BASE}px`, fontSize: "22px", transform: `translateY(${-(s - 1) * BASE * 0.5}px) scale(${s})`, transition: mouseX !== null ? "transform 60ms ease" : "transform 300ms cubic-bezier(.34,1.2,.64,1)" }}>{icon}</div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Dynamic Island ──────────────────────── */
type IslandState = "idle" | "ring" | "alarm" | "download" | "nav" | "message";
const ISLAND_DIMS: Record<IslandState, { w: number; h: number }> = {
  idle: { w: 126, h: 32 }, ring: { w: 316, h: 84 },
  alarm: { w: 258, h: 74 }, download: { w: 252, h: 76 },
  nav: { w: 252, h: 74 }, message: { w: 288, h: 88 },
};

function IslandDemo() {
  const [state, setState] = useState<IslandState>("idle");
  const [vis, setVis] = useState(false);
  const [prog, setProg] = useState(0);
  const autoRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();

  const activate = (s: IslandState) => {
    clearTimeout(autoRef.current); cancelAnimationFrame(rafRef.current!);
    setVis(false); setState(s);
    setTimeout(() => setVis(true), 160);
    if (s === "download") {
      setProg(0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 3800, 1); setProg(p * 100);
        if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
        else { autoRef.current = setTimeout(() => { setVis(false); setTimeout(() => setState("idle"), 200); }, 900); }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else { autoRef.current = setTimeout(() => { setVis(false); setTimeout(() => setState("idle"), 200); }, 5000); }
  };

  useEffect(() => () => { clearTimeout(autoRef.current); cancelAnimationFrame(rafRef.current!); }, []);
  const { w, h } = ISLAND_DIMS[state];
  const R = 20; const circ = 2 * Math.PI * R;

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "18px", paddingTop: "6px" }}>
      <span className="exp-demo-label">dynamic island</span>
      <div style={{ display: "flex", justifyContent: "center", minHeight: "100px", alignItems: "flex-start" }}>
        <div style={{ width: `${w}px`, height: `${h}px`, background: "#000", borderRadius: "100px", overflow: "hidden", transition: "width 420ms cubic-bezier(.34,1.15,.64,1), height 420ms cubic-bezier(.34,1.15,.64,1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: vis && state !== "idle" ? 1 : 0, transition: "opacity 180ms ease", width: "100%", height: "100%", padding: "0 14px", display: "flex", alignItems: "center", gap: "10px" }}>
            {state === "ring" && (<><div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "rgba(34,197,94,.18)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>👤</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)" }}>Incoming Call</div><div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginTop: "1px" }}>Tatenda C.</div><div style={{ display: "flex", gap: "2px", alignItems: "center", height: "14px", marginTop: "4px" }}>{[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75, 1, 0.45, 0.65].map((amp, i) => (<div key={i} style={{ width: "2px", background: "#22c55e", borderRadius: "1px", height: `${amp * 100}%`, animation: "d-wave 1.1s ease-in-out infinite", animationDelay: `${i * 80}ms` }} />))}</div></div><div style={{ display: "flex", gap: "7px", flexShrink: 0 }}><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", cursor: "pointer" }} onClick={() => activate("idle")}>📵</div><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", cursor: "pointer" }} onClick={() => activate("idle")}>📞</div></div></>)}
            {state === "alarm" && (<><div style={{ fontSize: "28px", flexShrink: 0 }}>⏰</div><div style={{ flex: 1 }}><div style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)", lineHeight: 1 }}>6:00</div><div style={{ fontSize: "10px", color: "rgba(255,255,255,.5)", marginTop: "3px" }}>Morning Alarm</div></div><div style={{ display: "flex", gap: "5px", flexShrink: 0 }}><button onClick={() => activate("idle")} style={{ fontSize: "10px", padding: "5px 9px", background: "rgba(255,255,255,.1)", border: "none", borderRadius: "20px", color: "#fff", cursor: "pointer" }}>Snooze</button><button onClick={() => activate("idle")} style={{ fontSize: "10px", padding: "5px 9px", background: "rgba(255,255,255,.18)", border: "none", borderRadius: "20px", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Dismiss</button></div></>)}
            {state === "download" && (<><div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(59,130,246,.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>⚡</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Claude</div><div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.5)", marginTop: "2px" }}>Downloading…</div></div><svg width="50" height="50" viewBox="0 0 50 50" style={{ flexShrink: 0 }}><circle cx="25" cy="25" r={R} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" /><circle cx="25" cy="25" r={R} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - prog / 100)} transform="rotate(-90 25 25)" style={{ transition: "stroke-dashoffset 80ms linear" }} /><text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,.85)" fontSize="9" fontFamily="monospace">{Math.round(prog)}%</text></svg></>)}
            {state === "nav" && (<><div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(59,130,246,.22)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>↗</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)" }}>Turn right</div><div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginTop: "1px" }}>Baker St</div><div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)", marginTop: "2px" }}>in 200m</div></div><div style={{ textAlign: "center", flexShrink: 0 }}><div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)", lineHeight: 1 }}>5</div><div style={{ fontSize: "9px", color: "rgba(255,255,255,.45)" }}>min</div></div></>)}
            {state === "message" && (<><div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "rgba(168,85,247,.22)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>👩</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: "11.5px", fontWeight: 600, color: "#fff" }}>Farai</div><div style={{ fontSize: "10.5px", color: "rgba(255,255,255,.55)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>are you still at the office? I&apos;ll</div></div></>)}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center" }}>
        {(["ring", "alarm", "download", "nav", "message"] as IslandState[]).map((s) => (
          <button key={s} className="d-island-btn" data-active={state === s} onClick={() => activate(s)}>
            {s === "ring" ? "📞 Ring" : s === "alarm" ? "⏰ Alarm" : s === "download" ? "⬇ Download" : s === "nav" ? "↗ Nav" : "💬 Message"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Drag to Dismiss ─────────────────────── */
function DragDemo() {
  const [y, setY] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);
  const startY = useRef(0); const velRef = useRef(0);
  const lastYRef = useRef(0); const lastTRef = useRef(0); const yRef = useRef(0);
  const updateY = (val: number) => { yRef.current = val; setY(val); };
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true; setIsDragging(true);
    startY.current = e.clientY - yRef.current;
    lastYRef.current = e.clientY; lastTRef.current = performance.now(); velRef.current = 0;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const newY = Math.max(0, e.clientY - startY.current);
    const dt = performance.now() - lastTRef.current;
    if (dt > 0) velRef.current = (e.clientY - lastYRef.current) / dt;
    lastYRef.current = e.clientY; lastTRef.current = performance.now(); updateY(newY);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false; setIsDragging(false);
    if (yRef.current > 80 || velRef.current > 0.5) { updateY(300); setTimeout(() => { setDismissed(true); updateY(0); }, 280); }
    else { velRef.current = 0; updateY(0); }
  };
  return (
    <div className="exp-demo" style={{ overflow: "hidden", position: "relative" }}>
      <span className="exp-demo-label">drag to dismiss</span>
      {dismissed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>dismissed ✓</span>
          <button style={{ fontFamily: "var(--font-mono)", fontSize: "11px", padding: "4px 10px", background: "none", border: "1px solid var(--border)", borderRadius: "4px", cursor: "pointer", color: "var(--fg-muted)" }} onClick={() => setDismissed(false)}>↺ restore</button>
        </div>
      ) : (
        <div className="d-drag-card" style={{ transform: `translateY(${y}px)`, transition: isDragging ? "none" : "transform 420ms cubic-bezier(.25,.46,.45,.94)", cursor: isDragging ? "grabbing" : "grab", opacity: Math.max(0, 1 - y / 180) }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
          <div className="d-drag-handle" />
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", textAlign: "center", margin: 0 }}>Drag down to dismiss</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", textAlign: "center", marginTop: "4px" }}>throw it — velocity counts</p>
        </div>
      )}
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

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    t0.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0.current;
      let allDone = true;
      const result = TARGET.split("").map((ch, i) => {
        if (elapsed >= i * 65 + 320) return ch;
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
      <span className="exp-demo-label">text scramble — hover</span>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "36px", fontWeight: 500, color: "var(--fg)", letterSpacing: ".04em", cursor: "default", userSelect: "none" }} onMouseEnter={scramble}>
        {display}
      </div>
      <button onClick={scramble} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)", background: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}>↺ scramble</button>
    </div>
  );
}

/* ════════════════════════════════════════════
   CODE SNIPPETS
════════════════════════════════════════════ */
const CODE: Record<ExpId, string> = {
  metaballs: `<span class="cm">/* SVG feColorMatrix threshold creates merge */</span>
&lt;filter id=<span class="str">"gooey"</span>&gt;
  &lt;feGaussianBlur stdDeviation=<span class="str">"10"</span> result=<span class="str">"blur"</span>/&gt;
  &lt;feColorMatrix in=<span class="str">"blur"</span> mode=<span class="str">"matrix"</span>
    values=<span class="str">"1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 22 -9"</span>/&gt;
&lt;/filter&gt;

<span class="cm">/* Apply to container */</span>
.<span class="fn">container</span> { <span class="prop">filter</span>: url(<span class="str">#gooey</span>); }

<span class="cm">/* The math:
   blur spreads alpha → feColorMatrix
   snaps it back to 0 or 1 — organic edges */</span>`,

  rope: `<span class="cm">// Verlet: velocity = position delta</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i < N; i++) {
  <span class="kw">const</span> vx = (p.x - p.px) * DAMPING
  <span class="kw">const</span> vy = (p.y - p.py) * DAMPING
  p.px = p.x;  p.py = p.y
  p.x += vx;   p.y += vy + GRAVITY
}

<span class="cm">// Constraint solver — 10 iterations</span>
<span class="kw">for</span> (<span class="kw">let</span> iter = <span class="num">0</span>; iter < <span class="num">10</span>; iter++) {
  <span class="kw">const</span> d = Math.<span class="fn">sqrt</span>(dx*dx + dy*dy)
  <span class="kw">const</span> diff = (d - REST) / d * <span class="num">0.5</span>
  a.x += dx*diff;  b.x -= dx*diff
  a.y += dy*diff;  b.y -= dy*diff
}`,

  "cursor-trail": `<span class="cm">// Decreasing spring stiffness per node</span>
N[<span class="num">0</span>].x += (mouse.x - N[<span class="num">0</span>].x) * <span class="num">0.45</span>

<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i < N.length; i++) {
  <span class="kw">const</span> k = Math.<span class="fn">max</span>(<span class="num">0.1</span>, <span class="num">0.38</span> - i * <span class="num">0.025</span>)
  N[i].x += (N[i-<span class="num">1</span>].x - N[i].x) * k
  N[i].y += (N[i-<span class="num">1</span>].y - N[i].y) * k
}

<span class="cm">// Head stiffness: 0.45
// Tail stiffness: max(0.1, 0.38-11*0.025) = 0.1
// Creates whip-like propagation</span>`,

  "tilt-card": `<span class="cm">// Map cursor → rotation</span>
<span class="kw">const</span> nx = (clientX - rect.left) / rect.width
<span class="kw">const</span> ny = (clientY - rect.top) / rect.height
<span class="fn">setTilt</span>({ x: (ny - <span class="num">.5</span>) * -<span class="num">14</span>, y: (nx - <span class="num">.5</span>) * <span class="num">14</span> })

<span class="cm">// Specular highlight tracks cursor</span>
background: \`radial-gradient(circle at
  \${nx * <span class="num">100</span>}% \${ny * <span class="num">100</span>}%,
  rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">4</span>) <span class="num">0</span>%,
  transparent <span class="num">65</span>%)\`
mixBlendMode: <span class="str">'overlay'</span>`,

  mag: `<span class="cm">// Pull: 35% of cursor offset</span>
<span class="kw">const</span> dx = clientX - (r.left + r.width / <span class="num">2</span>)
<span class="kw">const</span> dy = clientY - (r.top + r.height / <span class="num">2</span>)
<span class="fn">setPos</span>({ x: dx * <span class="num">0.35</span>, y: dy * <span class="num">0.35</span> })

style={{
  transform: \`translate(\${pos.x}px, \${pos.y}px)\`,
  transition: hovering
    ? <span class="str">'transform 80ms linear'</span>
    : <span class="str">'transform 400ms cubic-bezier(.23,1,.32,1)'</span>
}}`,

  dock: `<span class="cm">// Gaussian distance falloff</span>
<span class="kw">const</span> <span class="fn">scale</span> = (idx: <span class="kw">number</span>) => {
  <span class="kw">const</span> dist = Math.<span class="fn">abs</span>(mouseX - <span class="fn">center</span>(idx))
  <span class="kw">return</span> <span class="num">1</span> + (MAX - <span class="num">1</span>) *
    Math.<span class="fn">exp</span>(-(dist * dist) / (σ * σ))
}
<span class="cm">// σ = 55 → neighbour ≈ 1.4×
// σ = 80 → wider, softer spread</span>

transform: \`translateY(\${-(s-<span class="num">1</span>)*BASE*<span class="num">.5</span>}px)
  scale(\${s})\``,

  island: `<span class="cm">// Single div — morph via dimensions</span>
style={{
  <span class="prop">width</span>:  \`\${dims.w}px\`,
  <span class="prop">height</span>: \`\${dims.h}px\`,
  <span class="prop">borderRadius</span>: <span class="str">'100px'</span>,
  <span class="prop">transition</span>:
    <span class="str">'width 420ms cubic-bezier(.34,1.15,.64,1), '</span> +
    <span class="str">'height 420ms cubic-bezier(.34,1.15,.64,1)'</span>,
}}

<span class="cm">// Content fades in 160ms after morph
// Text never rides a distorting container</span>
opacity: vis && state !== <span class="str">'idle'</span> ? <span class="num">1</span> : <span class="num">0</span>`,

  drag: `<span class="cm">// Pointer capture tracks outside element</span>
e.currentTarget.<span class="fn">setPointerCapture</span>(e.pointerId)

<span class="cm">// Measure velocity across last two events</span>
vel = (e.clientY - lastY) / (now - lastT)

<span class="cm">// Dismiss: distance OR velocity threshold</span>
<span class="kw">if</span> (y > <span class="num">80</span> || vel > <span class="num">0.5</span>) {
  <span class="fn">dismiss</span>()   <span class="cm">// fast throw OR far drag</span>
} <span class="kw">else</span> {
  <span class="fn">spring</span>()    <span class="cm">// return to rest</span>
}`,

  scramble: `<span class="cm">// Lock each character after staggered delay</span>
<span class="kw">const</span> LOCK_DELAY = <span class="num">65</span> <span class="cm">// ms per character</span>
<span class="kw">const</span> SCRAMBLE = <span class="num">320</span> <span class="cm">// ms scramble window</span>

TARGET.<span class="fn">split</span>(<span class="str">''</span>).<span class="fn">map</span>((ch, i) => {
  <span class="kw">if</span> (elapsed >= i * LOCK_DELAY + SCRAMBLE)
    <span class="kw">return</span> ch  <span class="cm">// locked in</span>
  <span class="kw">return</span> CHARS[Math.<span class="fn">floor</span>(
    Math.<span class="fn">random</span>() * CHARS.length)]
})`,
};

const DEMOS: Record<ExpId, React.FC> = {
  metaballs: MetaballsDemo,
  rope: RopeDemo,
  "cursor-trail": CursorTrailDemo,
  "tilt-card": TiltCardDemo,
  mag: MagDemo,
  dock: DockDemo,
  island: IslandDemo,
  drag: DragDemo,
  scramble: ScrambleDemo,
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Experiments() {
  const [openId, setOpenId] = useState<ExpId | null>(null);
  const [views, setViews] = useState<Partial<Record<ExpId, "demo" | "code">>>({});
  const [barShadow, setBarShadow] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handler = () => {
      const bar = barRef.current;
      if (!bar) return;
      setBarShadow(bar.getBoundingClientRect().top <= 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggle = (id: ExpId) => {
    setOpenId((prev) => (prev === id ? null : id));
    setViews((prev) => ({ ...prev, [id]: prev[id] ?? "demo" }));
  };

  const getView = (id: ExpId) => views[id] ?? "demo";
  const setView = (id: ExpId, v: "demo" | "code") =>
    setViews((prev) => ({ ...prev, [id]: v }));

  return (
    <section id="exp-section" ref={sectionRef}>
      <div ref={barRef} className={`exp-bar${barShadow ? " shadow" : ""}`}>
        <div className="exp-bar-top">
          <div className="exp-bar-left">
            <span className="exp-bar-title">Experiments</span>
            <span className="exp-bar-count">{EXPS.length}</span>
          </div>
        </div>
      </div>

      <div className="exp-list">
        {EXPS.map((exp, i) => {
          const isOpen = openId === exp.id;
          const view = getView(exp.id);
          const DemoComponent = DEMOS[exp.id];

          return (
            <div key={exp.id} className={`exp-acc-item${isOpen ? " open" : ""}`}>
              <button className="exp-acc-head" onClick={() => toggle(exp.id)} aria-expanded={isOpen}>
                <span className="exp-acc-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="exp-acc-name">{exp.name}</span>
                <span className="exp-acc-date">{exp.date}</span>
                <span className="exp-acc-arrow" aria-hidden="true">▾</span>
              </button>

              <div className="exp-acc-body">
                <div className="exp-acc-inner">
                  <div className="exp-acc-content">
                    <p className="exp-acc-desc">{exp.detail}</p>

                    <div className="exp-toggle">
                      <button className={`exp-toggle-btn${view === "demo" ? " active" : ""}`} onClick={() => setView(exp.id, "demo")}>Preview</button>
                      <button className={`exp-toggle-btn${view === "code" ? " active" : ""}`} onClick={() => setView(exp.id, "code")}>Code</button>
                    </div>

                    <div className="exp-card">
                      <div className={`exp-pane${view === "demo" ? " show" : ""}`}>
                        {isOpen && <DemoComponent />}
                      </div>
                      <div className={`exp-pane${view === "code" ? " show" : ""}`}>
                        <div className="exp-code-pane">
                          <div className="exp-code-inner" dangerouslySetInnerHTML={{ __html: CODE[exp.id] }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
