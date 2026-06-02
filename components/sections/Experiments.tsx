"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════
   TYPES & DATA
════════════════════════════════════════════ */
type ExpId =
  | "var-font" | "bento" | "scroll-progress" | "spring-btn"
  | "cursor-trail" | "tilt-card" | "cmd" | "mag"
  | "cnt" | "stk" | "noise-btn" | "scramble" | "abb" | "seg-ctrl"
  | "toast" | "drag" | "checkbox" | "dock" | "island"
  | "otp" | "ctx" | "rope";

type Exp = {
  id: ExpId;
  name: string;
  date: string;
  tags: string[];
  cat: string;
  desc: string;
  detail: string;
};

const EXPS: Exp[] = [
  {
    id: "rope",
    name: "Rope Physics",
    date: "Jun 2026",
    tags: ["canvas", "physics"],
    cat: "Physics",
    desc: "A rope simulated with Verlet integration — grab the end and throw it.",
    detail: "24 particles connected by distance constraints. Verlet integration gives each particle implicit velocity via position deltas. 8 constraint iterations per frame keeps the rope inextensible without a stiff solver. Drag the free end and release — watch the energy dissipate through the damping coefficient.",
  },
  {
    id: "ctx",
    name: "Context Menu",
    date: "May 2026",
    tags: ["interaction", "animation"],
    cat: "Input",
    desc: "Right-click anywhere in the zone to spawn a context menu at the cursor.",
    detail: "The menu enters with a spring scale + translateY from the cursor's exact position. Positioned to stay inside bounds. Click any item or click outside to close. The entrance animation uses cubic-bezier(.34,1.2,.64,1) — 20ms faster than spring-btn because menus feel heavier at full spring duration.",
  },
  {
    id: "otp",
    name: "OTP Input",
    date: "Apr 2026",
    tags: ["input", "UX"],
    cat: "Input",
    desc: "Six-digit one-time code input with auto-advance, backspace, and paste support.",
    detail: "Each cell focuses the next on digit entry. Backspace returns to the previous cell and clears it. Paste distributes digits across all cells from the insertion point. The focused cell scales up slightly via a spring — a small touch that makes the active field unmissable. Enter six digits to see the completion state.",
  },
  {
    id: "var-font",
    name: "Variable Font Morph",
    date: "Mar 2025",
    tags: ["typography", "CSS"],
    cat: "Text",
    desc: "Font weight and width axes animate on hover, morphing between states.",
    detail: "A single word rendered with a variable font. On hover, the weight axis slides from 300 to 800 — the text visibly breathes. The easing curve overshoots slightly before settling, giving it physical weight. Built entirely with font-variation-settings and a CSS transition. Drag the slider to explore the weight axis manually.",
  },
  {
    id: "bento",
    name: "Bento Grid",
    date: "Feb 2025",
    tags: ["layout", "CSS Grid"],
    cat: "Visual",
    desc: "An asymmetric feature grid where each card has its own personality.",
    detail: "Five cards in a CSS Grid layout — one large hero card, two medium, two small. Each has a different internal layout. The grid gaps are intentionally uneven. Cards lift with a box-shadow on hover. Resize the window and the grid reflows at defined breakpoints using named grid areas.",
  },
  {
    id: "scroll-progress",
    name: "Scroll-Linked Progress",
    date: "Jan 2025",
    tags: ["scroll", "animation"],
    cat: "Scroll",
    desc: "A reading progress bar driven by scroll position — zero JS in the CSS version.",
    detail: "A 3px bar at the top of a scrollable container fills as you scroll. The pure-CSS version uses animation-timeline: scroll() — no scroll event listeners, no requestAnimationFrame. The demo uses a JS fallback for cross-browser support.",
  },
  {
    id: "spring-btn",
    name: "Spring Physics Button",
    date: "Dec 2024",
    tags: ["physics", "spring"],
    cat: "Physics",
    desc: "A button that compresses on press and bounces back with real spring physics.",
    detail: "On mousedown, the button squashes (scaleY 0.92, scaleX 1.04) like it has physical mass. On release, it springs back using a cubic-bezier that overshoots. The shadow deepens on press. No animation library — all cubic-bezier curves hand-tuned in CSS.",
  },
  {
    id: "cursor-trail",
    name: "Cursor Trail",
    date: "Nov 2024",
    tags: ["cursor", "canvas"],
    cat: "Physics",
    desc: "A trail of fading dots follows the cursor with spring lag between each node.",
    detail: "12 nodes, each following the previous with decreasing spring stiffness. The first node is tight, the last loose. Each is a circle on a canvas overlay — radius shrinking toward the tail, hue cycling slowly. Move your cursor around the panel.",
  },
  {
    id: "tilt-card",
    name: "Tilt Card",
    date: "Oct 2024",
    tags: ["3D", "perspective"],
    cat: "Visual",
    desc: "A card that tilts in 3D toward the cursor, with a specular highlight that moves.",
    detail: "On mousemove, the card rotates up to 12° on X and Y axes. A radial gradient set to mix-blend-mode: overlay tracks the cursor, simulating a light source. On mouseleave, the card springs back to flat. The drop-shadow shifts based on tilt angle.",
  },
  {
    id: "cmd",
    name: "Command Menu",
    date: "Sep 2024",
    tags: ["⌘K", "keyboard"],
    cat: "Input",
    desc: "A ⌘K command palette with fuzzy search, grouped results, and keyboard navigation.",
    detail: "Press ⌘K to open. Type to filter — the fuzzy match doesn't require exact matches. Arrow keys navigate, Enter runs, Escape closes. Results are grouped. The backdrop blurs content behind. The palette animates in from below.",
  },
  {
    id: "mag",
    name: "Magnetic Button",
    date: "Aug 2024",
    tags: ["cursor", "physics"],
    cat: "Physics",
    desc: "A button that pulls toward the cursor with elastic spring return.",
    detail: "As the cursor approaches the button, it translates toward the cursor — up to 8px in any direction. The pull is proportional to distance from centre. On mouseleave, it springs back using cubic-bezier(.23,1,.32,1) with a slight overshoot.",
  },
  {
    id: "cnt",
    name: "Animated Counter",
    date: "Jul 2024",
    tags: ["scroll", "numbers"],
    cat: "Scroll",
    desc: "Numbers count up from zero when scrolled into view, driven by easeOutCubic.",
    detail: "Three stats animate independently with a slight stagger. The easing is easeOutCubic — fast at the start, slowing into the final value. An IntersectionObserver triggers on first entry. A replay button resets and re-runs all three.",
  },
  {
    id: "stk",
    name: "Image Stack",
    date: "Jun 2024",
    tags: ["hover", "spring"],
    cat: "Visual",
    desc: "Stacked avatar circles fan out on hover with a spring overshoot.",
    detail: "Four avatar circles overlapping at rest. On hover they fan out symmetrically — first rotates left, last rotates right. The transition uses cubic-bezier(.34,1.56,.64,1), the spring with perceptible overshoot. On mouseleave they snap back.",
  },
  {
    id: "noise-btn",
    name: "Noise Button",
    date: "May 2024",
    tags: ["texture", "grain"],
    cat: "Visual",
    desc: "A button with SVG noise grain texture and a light-sweep on hover.",
    detail: "Two layered pseudo-elements: a fractal noise SVG filter (mix-blend-mode: overlay) adds grain that makes the surface feel physical. On hover, a diagonal gradient animates from right to left, simulating a light sweep. The combination Vercel and Linear use on premium CTAs.",
  },
  {
    id: "scramble",
    name: "Text Scramble",
    date: "Apr 2024",
    tags: ["text", "random"],
    cat: "Text",
    desc: "Characters cycle through random glyphs before resolving, left to right.",
    detail: "On hover, each character cycles through random alphanumerics at ~30fps. Characters resolve left to right — leftmost locks in first. The effect feels like a terminal decoding a message. The iteration speed is fractional so the decoding isn't perfectly mechanical.",
  },
  {
    id: "abb",
    name: "Apple Bottom Bar",
    date: "Mar 2024",
    tags: ["blur", "glass"],
    cat: "Visual",
    desc: "Recreation of the frosted-glass pill from the iPhone 15 marketing page.",
    detail: "A rounded pill with backdrop-filter: blur(20px), semi-transparent background, and a subtle white border. The blur radius and opacity are calibrated to match Apple's implementation — most copies get the opacity wrong (too high) or the border wrong (too visible).",
  },
  {
    id: "seg-ctrl",
    name: "Segmented Control",
    date: "Feb 2024",
    tags: ["selection", "spring"],
    cat: "Input",
    desc: "A pill indicator slides between segments with a spring that slightly overshoots.",
    detail: "Three segments: Design, Code, Ship. A white pill indicator slides under the active segment using cubic-bezier(.34,1.1,.64,1) — just enough overshoot to feel lively. The indicator width morphs to match each button's width.",
  },
  {
    id: "toast",
    name: "Toast Notifications",
    date: "Jan 2026",
    tags: ["feedback", "stack"],
    cat: "Input",
    desc: "Stacked notifications that slide in, queue behind each other, and auto-dismiss.",
    detail: "Three types: success, error, info. New toasts land at the front; older ones stack behind at reduced scale and opacity — a visual metaphor for depth. Each auto-dismisses after 3.5 seconds. Click any toast to remove it early. This is the visual language behind Sonner.",
  },
  {
    id: "drag",
    name: "Drag to Dismiss",
    date: "Dec 2025",
    tags: ["gesture", "pointer"],
    cat: "Physics",
    desc: "A card that tracks pointer drag and dismisses when thrown far enough.",
    detail: "Pointer capture keeps tracking even if the cursor leaves the element. On release, velocity is measured — a fast flick dismisses even if the distance was short. A slow drag needs to exceed 80px. Spring return on abandon. This is the interaction model of every mobile bottom sheet.",
  },
  {
    id: "checkbox",
    name: "Checkbox Animation",
    date: "Nov 2025",
    tags: ["SVG", "path"],
    cat: "Input",
    desc: "A checkmark that draws itself with a spring on check, strikethrough on complete.",
    detail: "An SVG path drives the checkmark draw using stroke-dasharray and stroke-dashoffset. On check: the box scales up with an overshoot spring, background fills, and the checkmark draws left-to-right. Three tasks — check them all.",
  },
  {
    id: "dock",
    name: "macOS Dock",
    date: "Oct 2025",
    tags: ["magnification", "Gaussian"],
    cat: "Physics",
    desc: "Icons magnify as the cursor approaches, with Gaussian distance falloff.",
    detail: "Scale is computed as 1 + (maxScale − 1) · e^(−dist² / σ²). The Gaussian falloff means adjacent icons grow proportionally — the icon under the cursor peaks at 1.8×, its neighbours at ~1.4×. σ controls the spread width. On mouseleave, everything springs back with a gentle overshoot.",
  },
  {
    id: "island",
    name: "Dynamic Island",
    date: "Sep 2025",
    tags: ["morphing", "Apple"],
    cat: "Visual",
    desc: "Apple's Dynamic Island with five Live Activity states.",
    detail: "The pill morphs between states using a single div — no clipping, no hidden layers. Width and height animate together with a spring that slightly overshoots. Content fades in 150ms after the shape starts moving, so text never rides a distorting container. Five states: ring, alarm, download, navigation, message.",
  },
];

const CATS = ["All", "Physics", "Text", "Visual", "Input", "Scroll"];

/* ════════════════════════════════════════════
   DEMO COMPONENTS
════════════════════════════════════════════ */

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
    const GRAVITY = 0.35;
    const DAMPING = 0.985;
    const ITERS = 10;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colorsRef.current.fg = s.getPropertyValue("--fg").trim() || "#1A1916";
      colorsRef.current.accent = s.getPropertyValue("--accent").trim() || "#C95C2A";
    };
    readColors();

    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      const pts = [];
      for (let i = 0; i < N; i++) {
        const y = 30 + i * REST;
        pts.push({ x: w / 2, y, px: w / 2, py: y });
      }
      stateRef.current = pts;
    };
    init();

    const tick = () => {
      const pts = stateRef.current;
      if (!pts.length) { rafRef.current = requestAnimationFrame(tick); return; }
      const { down, x: mx, y: my } = mouseRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 1; i < N; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
        if (p.x < 2) { p.x = 2; }
        if (p.x > w - 2) { p.x = w - 2; }
        if (p.y > h - 2) { p.y = h - 2; p.py = p.y + vy * 0.3; }
      }

      if (down) {
        const last = pts[N - 1];
        last.x = mx; last.y = my;
        last.px = mx; last.py = my;
      }

      for (let iter = 0; iter < ITERS; iter++) {
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
        if (down) { const last = pts[N - 1]; last.x = mx; last.y = my; }
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < N - 1; i++) {
        const mx2 = (pts[i].x + pts[i + 1].x) / 2;
        const my2 = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx2, my2);
      }
      ctx.lineTo(pts[N - 1].x, pts[N - 1].y);

      const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[N - 1].x, pts[N - 1].y);
      grad.addColorStop(0, colorsRef.current.accent + "cc");
      grad.addColorStop(1, colorsRef.current.accent + "55");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 5, 0, Math.PI * 2);
      ctx.fillStyle = colorsRef.current.fg;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pts[N - 1].x, pts[N - 1].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colorsRef.current.accent;
      ctx.fill();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="exp-demo" style={{ padding: 0, position: "relative" }}>
      <span className="exp-demo-label" style={{ zIndex: 1 }}>rope physics — drag end</span>
      <canvas
        ref={canvasRef}
        className="d-rope-canvas"
        style={{ width: "100%", height: "100%" }}
        onMouseMove={(e) => {
          const r = canvasRef.current?.getBoundingClientRect();
          if (!r) return;
          mouseRef.current.x = e.clientX - r.left;
          mouseRef.current.y = e.clientY - r.top;
        }}
        onMouseDown={() => { mouseRef.current.down = true; }}
        onMouseUp={() => { mouseRef.current.down = false; }}
        onMouseLeave={() => { mouseRef.current.down = false; }}
      />
    </div>
  );
}

/* ── Context Menu ────────────────────────── */
function CtxDemo() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="exp-demo">
      <span className="exp-demo-label">right-click anywhere</span>
      <div
        ref={areaRef}
        className="d-ctx-area"
        onContextMenu={onContextMenu}
        onClick={() => setMenu(null)}
      >
        {!menu && "right-click here"}
        {menu && (
          <div
            className="d-ctx-menu"
            style={{ top: menu.y, left: menu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-ctx-item" onClick={() => setMenu(null)}>
              <span className="d-ctx-icon">✏️</span>
              Edit
              <span className="d-ctx-hint">⌘E</span>
            </div>
            <div className="d-ctx-item" onClick={() => setMenu(null)}>
              <span className="d-ctx-icon">📋</span>
              Copy
              <span className="d-ctx-hint">⌘C</span>
            </div>
            <div className="d-ctx-item" onClick={() => setMenu(null)}>
              <span className="d-ctx-icon">🔗</span>
              Share
            </div>
            <div className="d-ctx-sep" />
            <div className="d-ctx-item danger" onClick={() => setMenu(null)}>
              <span className="d-ctx-icon">🗑</span>
              Delete
              <span className="d-ctx-hint">⌫</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── OTP Input ───────────────────────────── */
function OtpDemo() {
  const LEN = 6;
  const [vals, setVals] = useState<string[]>(Array(LEN).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const complete = vals.every((v) => v !== "");

  const reset = () => {
    setVals(Array(LEN).fill(""));
    refs.current[0]?.focus();
  };

  const onChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const next = vals.map((v, idx) => (idx === i ? digit : v));
    setVals(next);
    if (i < LEN - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (vals[i]) {
        setVals((v) => v.map((c, idx) => (idx === i ? "" : c)));
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        setVals((v) => v.map((c, idx) => (idx === i - 1 ? "" : c)));
      }
    }
  };

  const onPaste = (e: React.ClipboardEvent, start: number) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    const next = [...vals];
    for (let i = 0; i < text.length && start + i < LEN; i++) {
      next[start + i] = text[i];
    }
    setVals(next);
    const focus = Math.min(start + text.length, LEN - 1);
    refs.current[focus]?.focus();
  };

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px" }}>
      <span className="exp-demo-label">otp input</span>
      <div className="d-otp-wrap">
        {vals.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className={`d-otp-input${v ? " filled" : ""}`}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={v}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={(e) => onPaste(e, i)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {complete ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--green)" }}>
            ✓ code verified
          </p>
          <button
            onClick={reset}
            style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", background: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "3px 10px", cursor: "pointer" }}
          >
            ↺ reset
          </button>
        </div>
      ) : (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--fg-subtle)" }}>
          enter code or paste
        </p>
      )}
    </div>
  );
}

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
  const lift = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.cssText += ";box-shadow:var(--shadow-md);transform:translateY(-2px)";
  };
  const drop = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = "";
    (e.currentTarget as HTMLElement).style.transform = "";
  };
  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    padding: "16px", border: "1px solid var(--border)", borderRadius: "8px",
    background: "var(--bg-subtle)", transition: "box-shadow 140ms ease, transform 140ms ease",
    cursor: "default", ...extra,
  });

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
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "var(--fg-muted)", lineHeight: 1.6 }}>&ldquo;Build it. Ship it. Maintain it.&rdquo;</div>
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
        <div style={{ position: "absolute", inset: 0, borderRadius: "8px", background: "var(--accent-bg)", animation: "d-pulse-flash 300ms ease-out forwards", pointerEvents: "none" }} />
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
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at ${hl.x}% ${hl.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
          mixBlendMode: "overlay" as const,
          pointerEvents: "none",
          transition: leaving ? "opacity 300ms ease" : "none",
          opacity: leaving ? 0 : 1,
        }} />
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
              padding: "7px 18px", background: "none", border: "none",
              cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "13px",
              color: active === i ? "var(--fg)" : "var(--fg-muted)",
              transition: "color 140ms ease", borderRadius: "5px", whiteSpace: "nowrap",
            }}
          >
            {seg}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Toast Notifications ─────────────────── */
type ToastItem = { id: number; msg: string; type: "default" | "success" | "error" };

function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const add = (msg: string, type: ToastItem["type"]) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, msg, type }]);
    setTimeout(() => remove(id), 3500);
  };

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "14px" }}>
      <span className="exp-demo-label">toast notifications</span>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="d-toast-trigger" onClick={() => add("File saved successfully", "success")}>✓ Success</button>
        <button className="d-toast-trigger" onClick={() => add("Something went wrong", "error")}>✕ Error</button>
        <button className="d-toast-trigger" onClick={() => add("A new update is ready", "default")}>↑ Info</button>
      </div>
      <div className="d-toast-stack">
        {toasts.slice(-3).map((t, i, arr) => {
          const fromTop = arr.length - 1 - i;
          return (
            <div
              key={t.id}
              className="d-toast"
              data-type={t.type}
              style={{
                transform: `translateY(${fromTop * -9}px) scale(${1 - fromTop * 0.05})`,
                zIndex: i,
                opacity: 1 - fromTop * 0.18,
              }}
              onClick={() => remove(t.id)}
            >
              <span className="d-toast-icon">{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "·"}</span>
              {t.msg}
            </div>
          );
        })}
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
  const startY = useRef(0);
  const velRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);
  const yRef = useRef(0);

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
    lastYRef.current = e.clientY; lastTRef.current = performance.now();
    updateY(newY);
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false; setIsDragging(false);
    if (yRef.current > 80 || velRef.current > 0.5) {
      updateY(300);
      setTimeout(() => { setDismissed(true); updateY(0); }, 280);
    } else { velRef.current = 0; updateY(0); }
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
        <div
          className="d-drag-card"
          style={{
            transform: `translateY(${y}px)`,
            transition: isDragging ? "none" : "transform 420ms cubic-bezier(.25,.46,.45,.94)",
            cursor: isDragging ? "grabbing" : "grab",
            opacity: Math.max(0, 1 - y / 180),
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          <div className="d-drag-handle" />
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", textAlign: "center", margin: 0 }}>Drag down to dismiss</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", textAlign: "center", marginTop: "4px" }}>throw it — velocity counts</p>
        </div>
      )}
    </div>
  );
}

/* ── Checkbox Animation ──────────────────── */
const TASKS = ["Ship the redesign", "Write the tests", "Deploy to prod"];

function CheckboxDemo() {
  const [checked, setChecked] = useState([false, false, false]);
  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "2px", alignItems: "stretch", padding: "24px 32px" }}>
      <span className="exp-demo-label" style={{ position: "static", marginBottom: "12px" }}>checkbox animation</span>
      {TASKS.map((task, i) => (
        <div key={task} className="d-check-row" onClick={() => toggle(i)}>
          <div className={`d-checkbox${checked[i] ? " checked" : ""}`}>
            <svg viewBox="0 0 12 9" fill="none" style={{ width: "12px", height: "9px" }}>
              <path
                d="M1 4.5 L4.5 8 L11 1"
                stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 17,
                  strokeDashoffset: checked[i] ? 0 : 17,
                  transition: "stroke-dashoffset 220ms cubic-bezier(.34,1.2,.64,1)",
                }}
              />
            </svg>
          </div>
          <span style={{ fontSize: "13px", color: checked[i] ? "var(--fg-subtle)" : "var(--fg)", textDecoration: checked[i] ? "line-through" : "none", transition: "color 200ms ease" }}>
            {task}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── macOS Dock ──────────────────────────── */
function DockDemo() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ICONS = ["🏠", "⚡", "📁", "📸", "🎵", "⚙️", "🗑️"];
  const BASE = 36;
  const MAX_S = 1.8;
  const SIGMA = 55;

  const getScale = (idx: number): number => {
    if (mouseX === null || !containerRef.current) return 1;
    const rect = containerRef.current.getBoundingClientRect();
    const span = rect.width / ICONS.length;
    const cx = rect.left + (idx + 0.5) * span;
    const d = Math.abs(mouseX - cx);
    return 1 + (MAX_S - 1) * Math.exp(-(d * d) / (SIGMA * SIGMA));
  };

  return (
    <div className="exp-demo" style={{ justifyContent: "flex-end", paddingBottom: "16px" }}>
      <div
        ref={containerRef}
        className="d-dock"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {ICONS.map((icon, i) => {
          const s = getScale(i);
          return (
            <div key={i} className="d-dock-icon" style={{
              width: `${BASE}px`, height: `${BASE}px`, fontSize: "22px",
              transform: `translateY(${-(s - 1) * BASE * 0.5}px) scale(${s})`,
              transition: mouseX !== null ? "transform 60ms ease" : "transform 300ms cubic-bezier(.34,1.2,.64,1)",
            }}>{icon}</div>
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
    clearTimeout(autoRef.current);
    cancelAnimationFrame(rafRef.current!);
    setVis(false); setState(s);
    setTimeout(() => setVis(true), 160);
    if (s === "download") {
      setProg(0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 3800, 1);
        setProg(p * 100);
        if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
        else { autoRef.current = setTimeout(() => { setVis(false); setTimeout(() => setState("idle"), 200); }, 900); }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      autoRef.current = setTimeout(() => { setVis(false); setTimeout(() => setState("idle"), 200); }, 5000);
    }
  };

  useEffect(() => () => { clearTimeout(autoRef.current); cancelAnimationFrame(rafRef.current!); }, []);

  const { w, h } = ISLAND_DIMS[state];
  const R = 20; const circ = 2 * Math.PI * R;

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "18px", paddingTop: "6px" }}>
      <span className="exp-demo-label">dynamic island</span>
      <div style={{ display: "flex", justifyContent: "center", minHeight: "100px", alignItems: "flex-start" }}>
        <div style={{
          width: `${w}px`, height: `${h}px`, background: "#000",
          borderRadius: "100px", overflow: "hidden",
          transition: "width 420ms cubic-bezier(.34,1.15,.64,1), height 420ms cubic-bezier(.34,1.15,.64,1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ opacity: vis && state !== "idle" ? 1 : 0, transition: "opacity 180ms ease", width: "100%", height: "100%", padding: "0 14px", display: "flex", alignItems: "center", gap: "10px" }}>
            {state === "ring" && (
              <>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "rgba(34,197,94,.18)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>👤</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)" }}>Incoming Call</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", marginTop: "1px" }}>Tatenda C.</div>
                  <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "14px", marginTop: "4px" }}>
                    {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75, 1, 0.45, 0.65].map((amp, i) => (
                      <div key={i} style={{ width: "2px", background: "#22c55e", borderRadius: "1px", height: `${amp * 100}%`, animation: "d-wave 1.1s ease-in-out infinite", animationDelay: `${i * 80}ms` }} />
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "7px", flexShrink: 0 }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", cursor: "pointer" }} onClick={() => activate("idle")}>📵</div>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", cursor: "pointer" }} onClick={() => activate("idle")}>📞</div>
                </div>
              </>
            )}
            {state === "alarm" && (
              <>
                <div style={{ fontSize: "28px", flexShrink: 0 }}>⏰</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)", lineHeight: 1 }}>6:00</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.5)", marginTop: "3px" }}>Morning Alarm</div>
                </div>
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  <button onClick={() => activate("idle")} style={{ fontSize: "10px", padding: "5px 9px", background: "rgba(255,255,255,.1)", border: "none", borderRadius: "20px", color: "#fff", cursor: "pointer" }}>Snooze</button>
                  <button onClick={() => activate("idle")} style={{ fontSize: "10px", padding: "5px 9px", background: "rgba(255,255,255,.18)", border: "none", borderRadius: "20px", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Dismiss</button>
                </div>
              </>
            )}
            {state === "download" && (
              <>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(59,130,246,.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>⚡</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>Claude</div>
                  <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.5)", marginTop: "2px" }}>Downloading…</div>
                </div>
                <svg width="50" height="50" viewBox="0 0 50 50" style={{ flexShrink: 0 }}>
                  <circle cx="25" cy="25" r={R} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
                  <circle cx="25" cy="25" r={R} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - prog / 100)} transform="rotate(-90 25 25)" style={{ transition: "stroke-dashoffset 80ms linear" }} />
                  <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,.85)" fontSize="9" fontFamily="monospace">{Math.round(prog)}%</text>
                </svg>
              </>
            )}
            {state === "nav" && (
              <>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(59,130,246,.22)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>↗</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)" }}>Turn right</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginTop: "1px" }}>Baker St</div>
                  <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.45)", marginTop: "2px" }}>in 200m</div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)", lineHeight: 1 }}>5</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,.45)" }}>min</div>
                </div>
              </>
            )}
            {state === "message" && (
              <>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "rgba(168,85,247,.22)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>👩</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11.5px", fontWeight: 600, color: "#fff" }}>Farai</div>
                  <div style={{ fontSize: "10.5px", color: "rgba(255,255,255,.55)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>are you still at the office? I&apos;ll</div>
                </div>
              </>
            )}
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

/* ════════════════════════════════════════════
   CODE SNIPPETS
════════════════════════════════════════════ */
const CODE: Record<ExpId, string> = {
  rope: `<span class="cm">// Verlet integration — velocity from delta</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i < N; i++) {
  <span class="kw">const</span> vx = (p.x - p.px) * DAMPING
  <span class="kw">const</span> vy = (p.y - p.py) * DAMPING
  p.px = p.x;  p.py = p.y
  p.x += vx;   p.y += vy + GRAVITY
}

<span class="cm">// Constraint solver — 10 iterations</span>
<span class="kw">for</span> (<span class="kw">let</span> iter = <span class="num">0</span>; iter < <span class="num">10</span>; iter++) {
  <span class="kw">const</span> d = Math.<span class="fn">sqrt</span>(dx*dx + dy*dy) || <span class="num">0.001</span>
  <span class="kw">const</span> diff = (d - REST) / d * <span class="num">0.5</span>
  a.x += dx * diff;  b.x -= dx * diff
  a.y += dy * diff;  b.y -= dy * diff
}`,

  ctx: `<span class="cm">// Spawn at cursor, dismiss on outside click</span>
<span class="kw">const</span> <span class="fn">onContextMenu</span> = (e: MouseEvent) => {
  e.<span class="fn">preventDefault</span>()
  <span class="kw">const</span> rect = ref.current!.<span class="fn">getBoundingClientRect</span>()
  <span class="fn">setMenu</span>({ x: e.clientX - rect.left,
              y: e.clientY - rect.top })
}

<span class="cm">/* Entrance animation */</span>
@keyframes <span class="fn">ctxIn</span> {
  <span class="kw">from</span> {
    opacity: <span class="num">0</span>;
    transform: scale(.<span class="num">92</span>) translateY(-<span class="num">6px</span>);
  }
  <span class="kw">to</span> {
    opacity: <span class="num">1</span>;
    transform: scale(<span class="num">1</span>) translateY(<span class="num">0</span>);
  }
}`,

  otp: `<span class="cm">// Auto-advance on digit input</span>
<span class="kw">const</span> <span class="fn">onChange</span> = (i: <span class="kw">number</span>, v: <span class="kw">string</span>) => {
  <span class="kw">const</span> digit = v.<span class="fn">replace</span>(<span class="str">/\D/g</span>, <span class="str">''</span>).<span class="fn">slice</span>(-<span class="num">1</span>)
  <span class="kw">if</span> (!digit) <span class="kw">return</span>
  <span class="fn">setVals</span>(prev => prev.<span class="fn">map</span>((c, idx) =>
    idx === i ? digit : c))
  <span class="kw">if</span> (i < LEN - <span class="num">1</span>) refs.current[i + <span class="num">1</span>]?.<span class="fn">focus</span>()
}

<span class="cm">// Paste distributes from insertion point</span>
<span class="kw">const</span> text = e.clipboardData.<span class="fn">getData</span>(<span class="str">'text'</span>)
  .<span class="fn">replace</span>(<span class="str">/\D/g</span>, <span class="str">''</span>)
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i < text.length && start + i < LEN; i++)
  next[start + i] = text[i]`,

  "var-font": `<span class="cm">/* Animate weight axis on hover */</span>
.<span class="fn">word</span> {
  <span class="prop">font-variation-settings</span>: <span class="str">'wght'</span> <span class="kw">var</span>(--weight, <span class="num">300</span>);
  <span class="prop">transition</span>: font-variation-settings
    <span class="num">400ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.3</span>,.<span class="num">64</span>,<span class="num">1</span>);
}
.<span class="fn">word</span>:hover { --weight: <span class="num">800</span>; }

<span class="cm">/* Or drive with JS for a range slider */</span>
<span class="kw">const</span> [weight, setWeight] = <span class="fn">useState</span>(<span class="num">300</span>)
style={{ fontVariationSettings: \`<span class="str">'wght' \${weight}</span>\` }}`,

  bento: `.<span class="fn">grid</span> {
  <span class="prop">display</span>: grid;
  <span class="prop">grid-template-columns</span>: <span class="num">1fr 1fr</span>;
  <span class="prop">grid-template-areas</span>:
    <span class="str">"hero hero"</span>
    <span class="str">"stat  quote"</span>;
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
  transition: transform <span class="num">80ms</span> ease-in;
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

<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">1</span>; i < N.length; i++) {
  <span class="kw">const</span> k = Math.<span class="fn">max</span>(<span class="num">0.1</span>, <span class="num">0.38</span> - i * <span class="num">0.025</span>)
  N[i].x += (N[i-<span class="num">1</span>].x - N[i].x) * k
  N[i].y += (N[i-<span class="num">1</span>].y - N[i].y) * k
}`,

  "tilt-card": `<span class="cm">// Map cursor position to rotation</span>
<span class="kw">const</span> nx = (clientX - rect.left) / rect.width
<span class="kw">const</span> ny = (clientY - rect.top) / rect.height
<span class="fn">setTilt</span>({ x: (ny - <span class="num">0.5</span>) * -<span class="num">14</span>, y: (nx - <span class="num">0.5</span>) * <span class="num">14</span> })

<span class="cm">// Highlight tracks cursor</span>
style={{ background:
  \`radial-gradient(circle at
    \${nx * <span class="num">100</span>}% \${ny * <span class="num">100</span>}%,
    rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,<span class="num">0.4</span>) <span class="num">0</span>%, transparent <span class="num">65</span>%)\`,
  mixBlendMode: <span class="str">'overlay'</span> }}`,

  cmd: `<span class="cm">// Fuzzy match — "git" matches "Open GitHub"</span>
<span class="kw">function</span> <span class="fn">fuzzyMatch</span>(str: <span class="kw">string</span>, q: <span class="kw">string</span>) {
  <span class="kw">let</span> si = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> q.<span class="fn">toLowerCase</span>()) {
    <span class="kw">const</span> i = str.<span class="fn">toLowerCase</span>().<span class="fn">indexOf</span>(ch, si)
    <span class="kw">if</span> (i === -<span class="num">1</span>) <span class="kw">return false</span>
    si = i + <span class="num">1</span>
  }
  <span class="kw">return true</span>
}`,

  mag: `<span class="cm">// Translate toward cursor centre</span>
<span class="kw">const</span> <span class="fn">onMove</span> = (e: MouseEvent) => {
  <span class="kw">const</span> r = ref.current!.<span class="fn">getBoundingClientRect</span>()
  <span class="kw">const</span> dx = e.clientX - (r.left + r.width / <span class="num">2</span>)
  <span class="kw">const</span> dy = e.clientY - (r.top + r.height / <span class="num">2</span>)
  <span class="fn">setPos</span>({ x: dx * <span class="num">0.35</span>, y: dy * <span class="num">0.35</span> })
}
style={{ transform: \`translate(\${pos.x}px, \${pos.y}px)\`,
  transition: hovering
    ? <span class="str">'transform 80ms linear'</span>
    : <span class="str">'transform 400ms cubic-bezier(.23,1,.32,1)'</span> }}`,

  cnt: `<span class="cm">// easeOutCubic counter via rAF</span>
<span class="kw">const</span> t0 = performance.<span class="fn">now</span>()
<span class="kw">const</span> <span class="fn">tick</span> = (now: <span class="kw">number</span>) => {
  <span class="kw">const</span> p = Math.<span class="fn">min</span>((now - t0) / dur, <span class="num">1</span>)
  <span class="fn">setVal</span>(Math.<span class="fn">round</span>(
    (<span class="num">1</span> - (<span class="num">1</span> - p) ** <span class="num">3</span>) * target
  ))
  <span class="kw">if</span> (p < <span class="num">1</span>) <span class="fn">requestAnimationFrame</span>(tick)
}`,

  stk: `<span class="cm">/* CSS drives all transforms */</span>
.<span class="fn">d-stack-img</span> {
  <span class="prop">transition</span>: transform <span class="num">320ms</span>
    cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>);
}
.<span class="fn">spread</span> :nth-child(<span class="num">1</span>) {
  transform: translateX(-<span class="num">24px</span>) rotate(-<span class="num">8deg</span>);
}

<span class="cm">// React toggles the class</span>
<span class="kw">const</span> [spread, setSpread] = <span class="fn">useState</span>(<span class="kw">false</span>)`,

  "noise-btn": `<span class="cm">/* Grain layer via SVG filter */</span>
&lt;filter id=<span class="str">"noise"</span>&gt;
  &lt;feTurbulence
    type=<span class="str">"fractalNoise"</span>
    baseFrequency=<span class="str">"0.65"</span> numOctaves=<span class="str">"3"</span> /&gt;
&lt;/filter&gt;

<span class="cm">/* Light sweep on hover */</span>
.<span class="fn">shine</span> {
  background: linear-gradient(<span class="num">105deg</span>,
    transparent <span class="num">30%</span>,
    rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">25</span>) <span class="num">50%</span>,
    transparent <span class="num">70%</span>);
  background-size: <span class="num">200%</span>;
}
.<span class="fn">btn</span>:hover .<span class="fn">shine</span> { background-position: -<span class="num">100%</span>; }`,

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

  toast: `<span class="cm">// Stack appearance — depth via scale + offset</span>
<span class="kw">const</span> fromTop = toasts.length - <span class="num">1</span> - i
style={{
  transform: \`translateY(\${fromTop * -<span class="num">9</span>}px)
    scale(\${<span class="num">1</span> - fromTop * <span class="num">0.05</span>})\`,
  opacity: <span class="num">1</span> - fromTop * <span class="num">0.18</span>,
}}

<span class="cm">// Auto-dismiss after 3.5s, max 3 in stack</span>
<span class="fn">setTimeout</span>(() => <span class="fn">remove</span>(id), <span class="num">3500</span>)`,

  drag: `<span class="cm">// Pointer capture — tracks outside element</span>
<span class="kw">const</span> <span class="fn">onDown</span> = (e: PointerEvent) => {
  e.currentTarget.<span class="fn">setPointerCapture</span>(e.pointerId)
  startY.current = e.clientY - yRef.current
}

<span class="cm">// Velocity-based dismiss</span>
<span class="kw">const</span> <span class="fn">onUp</span> = () => {
  <span class="kw">if</span> (yRef.current > <span class="num">80</span> || vel.current > <span class="num">0.5</span>)
    <span class="fn">dismiss</span>()   <span class="cm">// fast flick OR far drag</span>
  <span class="kw">else</span>
    <span class="fn">setY</span>(<span class="num">0</span>)    <span class="cm">// spring back</span>
}`,

  checkbox: `<span class="cm">/* Draw checkmark via stroke-dashoffset */</span>
&lt;path d=<span class="str">"M1 4.5 L4.5 8 L11 1"</span>
  style={{
    <span class="prop">strokeDasharray</span>: <span class="num">17</span>,
    <span class="prop">strokeDashoffset</span>: checked ? <span class="num">0</span> : <span class="num">17</span>,
    <span class="prop">transition</span>: strokeDashoffset
      <span class="num">220ms</span> cubic-bezier(.<span class="num">34</span>, <span class="num">1.2</span>, .<span class="num">64</span>, <span class="num">1</span>),
  }} /&gt;

<span class="cm">/* Box springs on check */</span>
.<span class="fn">checkbox</span>.<span class="fn">checked</span> {
  transform: scale(<span class="num">1.1</span>);
  transition: transform <span class="num">150ms</span>
    cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>);
}`,

  dock: `<span class="cm">// Gaussian magnification falloff</span>
<span class="kw">const</span> <span class="fn">getScale</span> = (idx: <span class="kw">number</span>) => {
  <span class="kw">const</span> dist = Math.<span class="fn">abs</span>(mouseX - <span class="fn">iconCenter</span>(idx))
  <span class="kw">return</span> <span class="num">1</span> + (MAX - <span class="num">1</span>) *
    Math.<span class="fn">exp</span>(-(dist * dist) / (σ * σ))
}
<span class="cm">// σ = 55 → icon at 1 gap ≈ 1.4×</span>
transform: \`translateY(\${-(s-<span class="num">1</span>)*BASE*<span class="num">0.5</span>}px)
  scale(\${s})\``,

  island: `<span class="cm">// One div — morph via width + height</span>
style={{
  <span class="prop">width</span>:  \`\${dims.w}px\`,
  <span class="prop">height</span>: \`\${dims.h}px\`,
  <span class="prop">borderRadius</span>: <span class="str">'100px'</span>,
  <span class="prop">transition</span>:
    <span class="str">'width 420ms cubic-bezier(.34,1.15,.64,1),'</span> +
    <span class="str">'height 420ms cubic-bezier(.34,1.15,.64,1)'</span>,
}}

<span class="cm">// Content fades 160ms after morph starts</span>
opacity: vis && state !== <span class="str">'idle'</span> ? <span class="num">1</span> : <span class="num">0</span>,
transition: <span class="str">'opacity 180ms ease'</span>`,
};

const DEMOS: Record<ExpId, React.FC> = {
  rope: RopeDemo,
  ctx: CtxDemo,
  otp: OtpDemo,
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
  toast: ToastDemo,
  drag: DragDemo,
  checkbox: CheckboxDemo,
  dock: DockDemo,
  island: IslandDemo,
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function Experiments() {
  const [openId, setOpenId] = useState<ExpId | null>(null);
  const [views, setViews] = useState<Partial<Record<ExpId, "demo" | "code">>>({});
  const [cat, setCat] = useState("All");
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
      const rect = bar.getBoundingClientRect();
      setBarShadow(rect.top <= 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggle = (id: ExpId) => {
    setOpenId((prev) => prev === id ? null : id);
    setViews((prev) => ({ ...prev, [id]: prev[id] ?? "demo" }));
  };

  const getView = (id: ExpId) => views[id] ?? "demo";
  const setView = (id: ExpId, v: "demo" | "code") =>
    setViews((prev) => ({ ...prev, [id]: v }));

  const filtered = cat === "All" ? EXPS : EXPS.filter((e) => e.cat === cat);

  return (
    <section id="exp-section" ref={sectionRef}>
      <div ref={barRef} className={`exp-bar${barShadow ? " shadow" : ""}`}>
        <div className="exp-bar-top">
          <div className="exp-bar-left">
            <span className="exp-bar-title">Experiments</span>
            <span className="exp-bar-count">{filtered.length}</span>
          </div>
        </div>
        <div className="exp-cats">
          {CATS.map((c) => (
            <button
              key={c}
              className={`exp-cat${cat === c ? " active" : ""}`}
              onClick={() => { setCat(c); setOpenId(null); }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="exp-list">
        {filtered.map((exp, i) => {
          const isOpen = openId === exp.id;
          const view = getView(exp.id);
          const DemoComponent = DEMOS[exp.id];

          return (
            <div
              key={exp.id}
              className={`exp-acc-item${isOpen ? " open" : ""}`}
            >
              <button
                className="exp-acc-head"
                onClick={() => toggle(exp.id)}
                aria-expanded={isOpen}
              >
                <span className="exp-acc-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="exp-acc-name">{exp.name}</span>
                <div className="exp-acc-tags">
                  {exp.tags.map((t) => (
                    <span key={t} className="exp-acc-tag">{t}</span>
                  ))}
                </div>
                <span className="exp-acc-date">{exp.date}</span>
                <span className="exp-acc-arrow" aria-hidden="true">▾</span>
              </button>

              <div className="exp-acc-body">
                <div className="exp-acc-inner">
                  <div className="exp-acc-content">
                    <p className="exp-acc-desc">{exp.detail}</p>

                    <div className="exp-toggle">
                      <button
                        className={`exp-toggle-btn${view === "demo" ? " active" : ""}`}
                        onClick={() => setView(exp.id, "demo")}
                      >
                        Preview
                      </button>
                      <button
                        className={`exp-toggle-btn${view === "code" ? " active" : ""}`}
                        onClick={() => setView(exp.id, "code")}
                      >
                        Code
                      </button>
                    </div>

                    <div className="exp-card">
                      <div className={`exp-pane${view === "demo" ? " show" : ""}`}>
                        {isOpen && <DemoComponent />}
                      </div>
                      <div className={`exp-pane${view === "code" ? " show" : ""}`}>
                        <div className="exp-code-pane">
                          <div
                            className="exp-code-inner"
                            dangerouslySetInnerHTML={{ __html: CODE[exp.id] }}
                          />
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
