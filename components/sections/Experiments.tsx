"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  House,
  Terminal,
  Database,
  Image as PhImage,
  Waveform,
  Gear,
  Trash,
  CheckCircle,
  XCircle,
  Info,
  Phone,
  BellSimple,
  ArrowDown,
  NavigationArrow,
  ChatCircle,
  MagnifyingGlass,
  ArrowRight,
  GithubLogo,
  XLogo,
  Moon,
  Flask,
  ArrowLeft,
  ArrowsHorizontal,
} from "@phosphor-icons/react";

/*
   TYPES & DATA
 */
export type ExpId =
  | "var-font"
  | "cursor-trail"
  | "tilt-card"
  | "cmd"
  | "mag"
  | "toast"
  | "drag"
  | "checkbox"
  | "dock"
  | "island"
  | "oklch"
  | "fluid-type"
  | "flip-list"
  | "spring-config"
  | "focus-ring"
  | "resizable"
  | "streaming"
  | "view-transition";

export type Exp = {
  id: ExpId;
  name: string;
  date: string;
  desc: string;
  detail: string;
};

export const EXPS: Exp[] = [
  {
    id: "oklch",
    name: "OKLCH Color Mixer",
    date: "May 2025",
    desc: "Gradient interpolation in perceptual OKLCH vs sRGB — the difference is stark.",
    detail:
      "sRGB interpolation between two hues cuts through a desaturated grey midpoint. OKLCH interpolates through perceived lightness — L stays constant, so the midpoint is vivid, never muddy. Drag the hue sliders. The top gradient is sRGB. The bottom is OKLCH. The difference defines modern color in CSS.",
  },
  {
    id: "fluid-type",
    name: "Fluid Typography",
    date: "Apr 2025",
    desc: "A type scale that flows between min and max with CSS clamp() — no breakpoints.",
    detail:
      "Each step in the scale is defined by a single clamp(): a minimum size, a fluid midpoint tied to viewport width, and a maximum. Drag the viewport slider. The heading, body, and caption respond independently. The formula: clamp(min, min + (max - min) * ((100vw - 320px) / (1200 - 320)), max).",
  },
  {
    id: "var-font",
    name: "Variable Font Morph",
    date: "Mar 2025",
    desc: "Font weight and width axes animate on hover, morphing between states.",
    detail:
      "A single word rendered with a variable font. On hover, the weight axis slides from 300 to 800, and the text visibly breathes. The easing curve overshoots slightly before settling, giving it physical weight. Built entirely with font-variation-settings and a CSS transition. Drag the slider to explore the weight axis manually.",
  },
  {
    id: "cursor-trail",
    name: "Cursor Trail",
    date: "Nov 2024",
    desc: "A trail of fading dots follows the cursor with spring lag between each node.",
    detail:
      "12 nodes, each following the previous with decreasing spring stiffness. The first node is tight, the last loose. Each is a circle on a canvas overlay with radius shrinking toward the tail, hue cycling slowly. Move your cursor around the panel.",
  },
  {
    id: "tilt-card",
    name: "Tilt Card",
    date: "Oct 2024",
    desc: "A card that tilts in 3D toward the cursor, with a specular highlight that moves.",
    detail:
      "On mousemove, the card rotates up to 12 degrees on X and Y axes. A radial gradient set to mix-blend-mode: overlay tracks the cursor, simulating a light source. On mouseleave, the card springs back to flat. The drop-shadow shifts based on tilt angle.",
  },
  {
    id: "cmd",
    name: "Command Menu",
    date: "Sep 2024",
    desc: "A Cmd K command palette with fuzzy search, grouped results, and keyboard navigation.",
    detail:
      "Press Cmd K to open. Type to filter; the fuzzy match doesn't require exact matches. Arrow keys navigate, Enter runs, Escape closes. Results are grouped. The backdrop blurs content behind. The palette animates in from below.",
  },
  {
    id: "mag",
    name: "Magnetic Button",
    date: "Aug 2024",
    desc: "A button that pulls toward the cursor with elastic spring return.",
    detail:
      "As the cursor approaches the button, it translates toward the cursor, up to 8px in any direction. The pull is proportional to distance from centre. On mouseleave, it springs back using cubic-bezier(.23,1,.32,1) with a slight overshoot.",
  },
  {
    id: "toast",
    name: "Toast Notifications",
    date: "Jan 2026",
    desc: "Stacked notifications that slide in, queue behind each other, and auto-dismiss.",
    detail:
      "Three types: success, error, info. New toasts land at the front; older ones stack behind at reduced scale and opacity — a visual metaphor for depth. Each auto-dismisses after 3.5 seconds. Click any toast to remove it early. This is the visual language behind Sonner.",
  },
  {
    id: "drag",
    name: "Drag to Dismiss",
    date: "Dec 2025",
    desc: "A card that tracks pointer drag and dismisses when thrown far enough.",
    detail:
      "Pointer capture keeps tracking even if the cursor leaves the element. On release, velocity is measured — a fast flick dismisses even if the distance was short. A slow drag needs to exceed 80px. Spring return on abandon. This is the interaction model of every mobile bottom sheet.",
  },
  {
    id: "checkbox",
    name: "Checkbox Animation",
    date: "Nov 2025",
    desc: "A checkmark that draws itself with a spring on check, strikethrough on complete.",
    detail:
      "An SVG path drives the checkmark draw using stroke-dasharray and stroke-dashoffset. On check: the box scales up with an overshoot spring, background fills, and the checkmark draws left-to-right. Three tasks are ready to check.",
  },
  {
    id: "dock",
    name: "macOS Dock",
    date: "Oct 2025",
    desc: "Icons magnify as the cursor approaches, with Gaussian distance falloff.",
    detail:
      "Scale is computed as 1 + (maxScale − 1) × e^(−dist² / σ²). The Gaussian falloff means adjacent icons grow proportionally — the icon under the cursor peaks at 1.8, its neighbours at ~1.4. σ controls the spread width. On mouseleave, everything springs back with a gentle overshoot.",
  },
  {
    id: "island",
    name: "Dynamic Island",
    date: "Sep 2025",
    desc: "Apple's Dynamic Island with five Live Activity states.",
    detail:
      "The pill morphs between states using a single div — no clipping, no hidden layers. Width and height animate together with a spring that slightly overshoots. Content fades in 150ms after the shape starts moving, so text never rides a distorting container. Five states: ring, alarm, download, navigation, message.",
  },
  {
    id: "spring-config",
    name: "Spring Configurator",
    date: "Aug 2025",
    desc: "Tune stiffness, damping, and mass — watch the spring curve respond in real time.",
    detail:
      "A ball animates on a spring defined by three parameters. Stiffness sets how fast it pulls toward rest. Damping controls how quickly oscillation dies. Mass slows everything proportionally. The canvas plots the position curve alongside the demo. These are the same numbers driving every animation on this site.",
  },
  {
    id: "flip-list",
    name: "FLIP Animation",
    date: "Jul 2025",
    desc: "List items animate to new positions using the FLIP technique — no layout thrash.",
    detail:
      "FLIP: record First positions, shuffle items to get Last positions, Invert by applying a CSS transform that puts each element back in its First position, then Play by removing the transform. The browser animates from the inverted start to zero transform. Items appear to glide, not teleport.",
  },
  {
    id: "focus-ring",
    name: "Focus Ring System",
    date: "Jun 2025",
    desc: "Custom focus indicators that feel designed — not browser defaults, not invisible.",
    detail:
      "Tab through four element types: button, input, link, card. Each gets a focus ring tuned to its shape — pill gets a pill ring, square gets a square ring. The ring is drawn with outline and offset, never box-shadow, so it composites correctly. The color adapts to light and dark mode via CSS custom properties.",
  },
  {
    id: "resizable",
    name: "Resizable Panels",
    date: "May 2025",
    desc: "Drag the divider to resize two panels — pointer capture, min/max constraints.",
    detail:
      "A single drag handle separates two panels. Pointer capture routes all move events to the handle even when the cursor leaves it. The split is clamped between 20% and 80% so neither panel collapses. On pointerup, the split snaps to the nearest 5% increment with a spring.",
  },
  {
    id: "streaming",
    name: "Streaming Text",
    date: "Apr 2025",
    desc: "Characters render one at a time as if arriving from a stream, with variable delay.",
    detail:
      "A setTimeout loop renders each character individually. Delay is 28ms per character, stretching to 180ms after punctuation — the natural reading rhythm of spoken language. A blinking cursor trails the head. This is the rendering model behind every LLM chat interface in 2025.",
  },
  {
    id: "view-transition",
    name: "View Transitions",
    date: "Mar 2025",
    desc: "Shared-element morphing between list and detail views using the native browser API.",
    detail:
      "document.startViewTransition() wraps a state update. Elements with matching view-transition-name values morph between their old and new positions automatically. The browser generates ::view-transition-old and ::view-transition-new pseudo-elements, animating between them with a cross-fade by default. Custom keyframes override the default.",
  },
];

/*
   DEMO COMPONENTS
 */

/*  Variable Font Morph  */
function VarFontDemo() {
  const [weight, setWeight] = useState(300);
  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px" }}>
      <span className="exp-demo-label">variable font</span>
      <div
        style={{
          fontVariationSettings: `'wght' ${weight}`,
          fontSize: "40px",
          fontFamily: "var(--font-sans)",
          letterSpacing: "-.02em",
          color: "var(--fg)",
          cursor: "default",
          userSelect: "none",
          transition:
            "font-variation-settings 400ms cubic-bezier(.34,1.3,.64,1)",
        }}
        onMouseEnter={() => setWeight(800)}
        onMouseLeave={() => setWeight(300)}
      >
        CORELITH
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <input
          type="range"
          min="100"
          max="900"
          step="10"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          style={{ width: "180px", accentColor: "var(--accent)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--fg-subtle)",
          }}
        >
          wght: {weight}
        </span>
      </div>
    </div>
  );
}

/*  Cursor Trail  */
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
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="exp-demo" style={{ padding: 0, position: "relative" }}>
      <span className="exp-demo-label" style={{ zIndex: 1 }}>
        cursor trail move mouse here
      </span>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "none",
        }}
        onMouseEnter={() => {
          active.current = true;
        }}
        onMouseLeave={() => {
          active.current = false;
        }}
        onMouseMove={(e) => {
          const rect = (
            e.currentTarget as HTMLCanvasElement
          ).getBoundingClientRect();
          mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }}
      />
    </div>
  );
}

/*  Tilt Card  */
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

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setLeaving(true);
  };

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
          boxShadow: leaving
            ? "var(--shadow-md)"
            : `${-tilt.y * 0.6}px ${tilt.x * 0.6}px 24px rgba(0,0,0,.14)`,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: leaving
            ? "transform 500ms cubic-bezier(.25,.46,.45,.94), box-shadow 500ms ease"
            : "none",
          position: "relative",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${hl.x}% ${hl.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
            mixBlendMode: "overlay" as const,
            pointerEvents: "none",
            transition: leaving ? "opacity 300ms ease" : "none",
            opacity: leaving ? 0 : 1,
          }}
        />
        <p
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "var(--fg)",
            marginBottom: "4px",
          }}
        >
          Tatenda Chinyamakobvu
        </p>
        <p style={{ fontSize: "14px", color: "var(--fg-muted)" }}>
          Full-stack engineer
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            color: "var(--fg-subtle)",
            marginTop: "12px",
          }}
        >
          Corelith Zimbabwe
        </p>
      </div>
    </div>
  );
}

/*  Command Menu  */
type CmdItem = { label: string; hint: string; group: string; icon: React.ReactNode };
const CMD_ITEMS: CmdItem[] = [
  { label: "Go to home", hint: "navigate", group: "Navigation", icon: <House size={14} /> },
  { label: "Open GitHub", hint: "tate2301", group: "Links", icon: <GithubLogo size={14} /> },
  { label: "Open X / Twitter", hint: "@atipamara", group: "Links", icon: <XLogo size={14} /> },
  { label: "Dynamic Island", hint: "experiment", group: "Experiments", icon: <Flask size={14} /> },
  { label: "macOS Dock", hint: "experiment", group: "Experiments", icon: <Flask size={14} /> },
  { label: "Switch to dark mode", hint: "theme", group: "Settings", icon: <Moon size={14} /> },
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
  useEffect(() => {
    setSel(0);
  }, [query]);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  const groups: Record<string, CmdItem[]> = {};
  for (const item of filtered)
    (groups[item.group] = groups[item.group] ?? []).push(item);
  let gi = -1;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="exp-demo">
      <span className="exp-demo-label">command palette</span>
      <button
        className="d-cmd-trigger"
        onClick={() => {
          setOpen(true);
          setQuery("");
        }}
      >
        <span>Search or run a command</span>
        <kbd>K</kbd>
      </button>
      {open && (
        <div className="mini-palette open">
          <button
            className="mini-close"
            onClick={() => setOpen(false)}
          ></button>
          <div className="mini-input-row">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              className="mini-input"
              placeholder="Type to filter"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKey}
            />
          </div>
          <div className="mini-results">
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "var(--fg-subtle)",
                }}
              >
                No results
              </div>
            ) : (
              Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="mini-group">{group}</div>
                  {items.map((item) => {
                    gi++;
                    const idx = gi;
                    return (
                      <div
                        key={item.label}
                        className={`mini-item${sel === idx ? " sel" : ""}`}
                        onMouseEnter={() => setSel(idx)}
                        onClick={() => setOpen(false)}
                      >
                        <span className="mini-item-icon">{item.icon}</span>
                        <span>{item.label}</span>
                        <span className="mini-item-hint">{item.hint}</span>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/*  Magnetic Button  */
function MagDemo() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.35,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
    });
  };

  return (
    <div
      className="exp-demo"
      onMouseMove={onMove}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setHovering(false);
      }}
    >
      <span className="exp-demo-label">magnetic button</span>
      <button
        ref={btnRef}
        className="d-mag-btn"
        onMouseEnter={() => setHovering(true)}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hovering
            ? "transform 80ms linear"
            : "transform 400ms cubic-bezier(.23,1,.32,1)",
        }}
      >
        Pull me
      </button>
    </div>
  );
}

/*  Toast Notifications  */
type ToastItem = {
  id: number;
  msg: string;
  type: "default" | "success" | "error";
};

const TOAST_ICON: Record<ToastItem["type"], React.ReactNode> = {
  success: <CheckCircle weight="fill" size={15} />,
  error: <XCircle weight="fill" size={15} />,
  default: <Info weight="fill" size={15} />,
};

function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const add = (msg: string, type: ToastItem["type"]) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, msg, type }]);
    setTimeout(() => remove(id), 3500);
  };

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "14px" }}>
      <span className="exp-demo-label">toast notifications</span>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="d-toast-trigger" onClick={() => add("File saved successfully", "success")}>
          Success
        </button>
        <button className="d-toast-trigger" onClick={() => add("Something went wrong", "error")}>
          Error
        </button>
        <button className="d-toast-trigger" onClick={() => add("A new update is ready", "default")}>
          Info
        </button>
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
              <span className="d-toast-icon" aria-hidden="true">{TOAST_ICON[t.type]}</span>
              {t.msg}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*  Drag to Dismiss  */
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

  const updateY = (val: number) => {
    yRef.current = val;
    setY(val);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setIsDragging(true);
    startY.current = e.clientY - yRef.current;
    lastYRef.current = e.clientY;
    lastTRef.current = performance.now();
    velRef.current = 0;
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const rawY = e.clientY - startY.current;
    const newY = rawY < 0 ? rawY * 0.18 : rawY;
    const dt = performance.now() - lastTRef.current;
    if (dt > 0) velRef.current = (e.clientY - lastYRef.current) / dt;
    lastYRef.current = e.clientY;
    lastTRef.current = performance.now();
    updateY(newY);
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    if (yRef.current > 80 || velRef.current > 0.5) {
      updateY(300);
      setTimeout(() => {
        setDismissed(true);
        updateY(0);
      }, 220);
    } else {
      velRef.current = 0;
      updateY(0);
    }
  };

  return (
    <div
      className="exp-demo"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <span className="exp-demo-label">drag to dismiss</span>
      {dismissed ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "var(--fg-subtle)",
            }}
          >
            dismissed
          </span>
          <button
            className="d-counter-replay"
            onClick={() => setDismissed(false)}
          >
            Restore
          </button>
        </div>
      ) : (
        <div
          className="d-drag-card"
          style={{
            transform: `translateY(${y}px)`,
            transition: isDragging
              ? "none"
              : "transform 220ms cubic-bezier(.23,1,.32,1), opacity 160ms ease",
            cursor: isDragging ? "grabbing" : "grab",
            opacity: Math.max(0, 1 - Math.max(0, y) / 180),
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="d-drag-handle" />
          <p
            style={{
              fontSize: "14px",
              color: "var(--fg-muted)",
              textAlign: "center",
              margin: 0,
            }}
          >
            Drag down to dismiss
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "var(--fg-subtle)",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            velocity counts
          </p>
        </div>
      )}
    </div>
  );
}
/*  Checkbox Animation  */
const TASKS = ["Ship the redesign", "Write the tests", "Deploy to prod"];

function CheckboxDemo() {
  const [checked, setChecked] = useState([false, false, false]);
  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div
      className="exp-demo"
      style={{
        flexDirection: "column",
        gap: "2px",
        alignItems: "stretch",
        padding: "24px 32px",
      }}
    >
      <span
        className="exp-demo-label"
        style={{ position: "static", marginBottom: "12px" }}
      >
        checkbox animation
      </span>
      {TASKS.map((task, i) => (
        <div key={task} className="d-check-row" onClick={() => toggle(i)}>
          <div className={`d-checkbox${checked[i] ? " checked" : ""}`}>
            <svg
              viewBox="0 0 12 9"
              fill="none"
              style={{ width: "12px", height: "9px" }}
            >
              <path
                d="M1 4.5 L4.5 8 L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 17,
                  strokeDashoffset: checked[i] ? 0 : 17,
                  transition:
                    "stroke-dashoffset 220ms cubic-bezier(.34,1.2,.64,1)",
                }}
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "14px",
              color: checked[i] ? "var(--fg-subtle)" : "var(--fg)",
              textDecoration: checked[i] ? "line-through" : "none",
              transition: "color 200ms ease",
            }}
          >
            {task}
          </span>
        </div>
      ))}
    </div>
  );
}

/*  macOS Dock  */
const DOCK_APPS: { icon: React.ReactNode; label: string; color: string }[] = [
  { icon: <House weight="fill" size={20} />, label: "Home", color: "#4F46E5" },
  { icon: <Terminal weight="fill" size={20} />, label: "Terminal", color: "#059669" },
  { icon: <Database weight="fill" size={20} />, label: "Database", color: "#B45309" },
  { icon: <PhImage weight="fill" size={20} />, label: "Photos", color: "#DB2777" },
  { icon: <Waveform weight="fill" size={20} />, label: "Audio", color: "#7C3AED" },
  { icon: <Gear weight="fill" size={20} />, label: "Settings", color: "#6B7280" },
  { icon: <Trash weight="fill" size={20} />, label: "Trash", color: "#DC2626" },
];

function DockDemo() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const BASE = 40;
  const MAX_S = 1.72;
  const SIGMA = 58;

  const getScale = (idx: number): number => {
    if (mouseX === null || !containerRef.current) return 1;
    const rect = containerRef.current.getBoundingClientRect();
    const span = rect.width / DOCK_APPS.length;
    const cx = rect.left + (idx + 0.5) * span;
    const d = Math.abs(mouseX - cx);
    return 1 + (MAX_S - 1) * Math.exp(-(d * d) / (SIGMA * SIGMA));
  };

  return (
    <div className="exp-demo" style={{ justifyContent: "flex-end", paddingBottom: "16px" }}>
      <span className="exp-demo-label">dock magnification</span>
      <div
        ref={containerRef}
        className="d-dock"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {DOCK_APPS.map((app, i) => {
          const s = getScale(i);
          return (
            <div
              key={app.label}
              className="d-dock-icon"
              title={app.label}
              style={{
                width: `${BASE}px`,
                height: `${BASE}px`,
                background: app.color,
                transform: `translateY(${-(s - 1) * BASE * 0.5}px) scale(${s})`,
                transition: mouseX !== null ? "transform 60ms ease" : "transform 220ms cubic-bezier(.23,1,.32,1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {app.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}
/*  OKLCH Color Mixer  */
function OklchDemo() {
  const [hue1, setHue1] = useState(260);
  const [hue2, setHue2] = useState(160);

  const oklchGradient = (h1: number, h2: number) => {
    const steps = 7;
    const stops = Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      const h = h1 + (h2 - h1) * t;
      const hRad = (h * Math.PI) / 180;
      const L = 0.65;
      const C = 0.18;
      const a = C * Math.cos(hRad);
      const b = C * Math.sin(hRad);
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      const lc = l_ * l_ * l_;
      const mc = m_ * m_ * m_;
      const sc = s_ * s_ * s_;
      let r = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
      let g = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
      let bv = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;
      const toSrgb = (x: number) => {
        const v = Math.max(0, Math.min(1, x));
        return Math.round((v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255);
      };
      return `rgb(${toSrgb(r)},${toSrgb(g)},${toSrgb(bv)}) ${(t * 100).toFixed(0)}%`;
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  };

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px", padding: "24px" }}>
      <span className="exp-demo-label">oklch color mixer</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            sRGB — hue {hue1}° → {hue2}°
          </span>
          <div
            style={{
              height: "36px",
              borderRadius: "6px",
              background: `linear-gradient(90deg, hsl(${hue1},70%,55%), hsl(${hue2},70%,55%))`,
              border: "1px solid var(--border)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            OKLCH — perceptual L=0.65 C=0.18
          </span>
          <div
            style={{
              height: "36px",
              borderRadius: "6px",
              background: oklchGradient(hue1, hue2),
              border: "1px solid var(--border)",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "16px", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            Hue A: {hue1}°
          </label>
          <input type="range" min="0" max="360" value={hue1} onChange={(e) => setHue1(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            Hue B: {hue2}°
          </label>
          <input type="range" min="0" max="360" value={hue2} onChange={(e) => setHue2(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
        </div>
      </div>
    </div>
  );
}

/*  Fluid Typography  */
function FluidTypeDemo() {
  const [vw, setVw] = useState(768);
  const MIN_VW = 320;
  const MAX_VW = 1200;

  const fluid = (minPx: number, maxPx: number) => {
    const slope = (maxPx - minPx) / (MAX_VW - MIN_VW);
    const intercept = minPx - slope * MIN_VW;
    const preferred = slope * vw + intercept;
    return Math.min(maxPx, Math.max(minPx, preferred));
  };

  const headingSize = fluid(28, 52);
  const bodySize = fluid(15, 18);
  const captionSize = fluid(12, 14);
  const pct = ((vw - MIN_VW) / (MAX_VW - MIN_VW)) * 100;

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px", padding: "24px", alignItems: "stretch" }}>
      <span className="exp-demo-label">fluid typography</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontSize: headingSize, fontWeight: 700, color: "var(--fg)", lineHeight: 1.1, letterSpacing: "-.02em", transition: "font-size 60ms ease" }}>
          Design systems
        </div>
        <div style={{ fontSize: bodySize, color: "var(--fg-muted)", lineHeight: 1.6, transition: "font-size 60ms ease" }}>
          Typography that scales continuously, not discretely.
        </div>
        <div style={{ fontSize: captionSize, fontFamily: "var(--font-mono)", color: "var(--fg-subtle)", transition: "font-size 60ms ease" }}>
          {headingSize.toFixed(1)}px heading · {bodySize.toFixed(1)}px body · {captionSize.toFixed(1)}px caption
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>Viewport: {vw}px</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>{pct.toFixed(0)}% of range</span>
        </div>
        <input type="range" min={MIN_VW} max={MAX_VW} value={vw} onChange={(e) => setVw(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)" }}>{MIN_VW}px</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)" }}>{MAX_VW}px</span>
        </div>
      </div>
    </div>
  );
}

/*  Spring Configurator  */
function SpringConfigDemo() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(18);
  const [mass, setMass] = useState(1);
  const [running, setRunning] = useState(false);
  const [ballY, setBallY] = useState(0);
  const [curve, setCurve] = useState<number[]>([]);
  const rafRef = useRef<number>();

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const TARGET = 80;
    let pos = 0;
    let vel = 0;
    const dt = 1 / 60;
    const pts: number[] = [];
    setRunning(true);
    setBallY(0);

    const tick = () => {
      const force = -stiffness * (pos - TARGET) - damping * vel;
      const acc = force / mass;
      vel += acc * dt;
      pos += vel * dt;
      pts.push(pos);
      setBallY(pos);
      if (pts.length < 120) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurve([...pts]);
        setRunning(false);
      }
    };
    setCurve([]);
    rafRef.current = requestAnimationFrame(tick);
  }, [stiffness, damping, mass]);

  useEffect(() => { run(); }, [run]);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const W = 220;
  const H = 80;
  const TARGET_VAL = 80;
  const pts = curve.length > 0 ? curve : [];
  const maxY = Math.max(TARGET_VAL, ...pts);
  const pathD = pts
    .map((y, i) => {
      const x = (i / (pts.length - 1 || 1)) * W;
      const py = H - (y / maxY) * (H - 4);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "16px", padding: "20px" }}>
      <span className="exp-demo-label">spring configurator</span>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <div style={{ position: "relative", width: "32px", height: "100px", background: "var(--bg-subtle)", borderRadius: "6px", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              bottom: `calc(${((ballY / 100) * 60)}px)`,
              left: "4px",
              right: "4px",
              height: "24px",
              background: "var(--accent)",
              borderRadius: "4px",
              transition: running ? "none" : undefined,
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <svg width={W} height={H} style={{ display: "block" }}>
            <line x1="0" y1={H - (TARGET_VAL / maxY) * (H - 4)} x2={W} y2={H - (TARGET_VAL / maxY) * (H - 4)} stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3" />
            {pathD && <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="1.5" />}
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {([["Stiffness", stiffness, setStiffness, 20, 600] as const,
           ["Damping", damping, setDamping, 1, 60] as const,
           ["Mass", mass, setMass, 0.1, 4] as const] as const).map(([label, val, setter, min, max]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)", width: "70px", flexShrink: 0 }}>{label}: {typeof val === "number" && val < 10 ? val.toFixed(1) : val}</span>
            <input
              type="range"
              min={min}
              max={max}
              step={label === "Mass" ? 0.1 : 1}
              value={val}
              onChange={(e) => setter(Number(e.target.value) as never)}
              style={{ flex: 1, accentColor: "var(--accent)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/*  FLIP List Animation  */
function FlipListDemo() {
  const ITEMS = ["Render", "Layout", "Paint", "Composite"];
  const [order, setOrder] = useState(ITEMS);
  const [animating, setAnimating] = useState(false);
  const refsMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevPositions = useRef<Map<string, DOMRect>>(new Map());

  const shuffle = useCallback(() => {
    if (animating) return;
    const els = refsMap.current;
    prevPositions.current.clear();
    els.forEach((el, key) => {
      prevPositions.current.set(key, el.getBoundingClientRect());
    });
    setOrder((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  }, [animating]);

  useEffect(() => {
    const els = refsMap.current;
    const prev = prevPositions.current;
    if (prev.size === 0) return;
    const toPlay: { el: HTMLDivElement; dx: number; dy: number }[] = [];
    els.forEach((el, key) => {
      const old = prev.get(key);
      if (!old) return;
      const cur = el.getBoundingClientRect();
      const dx = old.left - cur.left;
      const dy = old.top - cur.top;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        toPlay.push({ el, dx, dy });
      }
    });
    if (toPlay.length === 0) return;
    setAnimating(true);
    toPlay.forEach(({ el, dx, dy }) => {
      el.style.transform = `translate(${dx}px,${dy}px)`;
      el.style.transition = "none";
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toPlay.forEach(({ el }) => {
          el.style.transform = "";
          el.style.transition = "transform 380ms cubic-bezier(.34,1.2,.64,1)";
        });
        setTimeout(() => setAnimating(false), 400);
      });
    });
  }, [order]);

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "16px", padding: "20px" }}>
      <span className="exp-demo-label">flip list</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
        {order.map((item) => (
          <div
            key={item}
            ref={(el) => {
              if (el) refsMap.current.set(item, el);
              else refsMap.current.delete(item);
            }}
            style={{
              padding: "10px 14px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              background: "var(--bg-subtle)",
              fontSize: "14px",
              color: "var(--fg)",
              fontFamily: "var(--font-mono)",
              userSelect: "none",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={shuffle}
        style={{
          padding: "8px 18px",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--fg-muted)",
          alignSelf: "center",
        }}
      >
        Shuffle
      </button>
    </div>
  );
}

/*  Focus Ring System  */
function FocusRingDemo() {
  const [focused, setFocused] = useState<string | null>(null);

  const ringStyle = (id: string, shape: "pill" | "rect" | "underline" = "rect"): React.CSSProperties => {
    const isFocused = focused === id;
    if (!isFocused) return {};
    return {
      outline: shape === "underline" ? "none" : "2px solid var(--accent)",
      outlineOffset: shape === "pill" ? "3px" : "2px",
      borderBottom: shape === "underline" ? "2px solid var(--accent)" : undefined,
      boxShadow: shape === "underline" ? "none" : "0 0 0 4px color-mix(in oklch, var(--accent) 18%, transparent)",
    };
  };

  const focusProps = (id: string) => ({
    onFocus: () => setFocused(id),
    onBlur: () => setFocused(null),
    style: { outline: "none" },
  });

  return (
    <div
      className="exp-demo"
      style={{ flexDirection: "column", gap: "20px", padding: "24px", alignItems: "stretch" }}
    >
      <span className="exp-demo-label">focus ring system — tab through</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <button
          {...focusProps("btn")}
          style={{
            padding: "10px 20px",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            alignSelf: "flex-start",
            transition: "outline-offset 100ms ease, box-shadow 100ms ease",
            ...ringStyle("btn", "pill"),
          }}
        >
          Primary action
        </button>
        <input
          {...focusProps("input")}
          defaultValue="Type something"
          style={{
            padding: "9px 12px",
            background: "var(--bg-subtle)",
            color: "var(--fg)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            transition: "outline-offset 100ms ease, box-shadow 100ms ease",
            ...ringStyle("input"),
          }}
        />
        <a
          href="#"
          {...focusProps("link")}
          onClick={(e) => e.preventDefault()}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--accent)",
            textDecoration: "underline",
            alignSelf: "flex-start",
            paddingBottom: "1px",
            transition: "outline-offset 100ms ease, box-shadow 100ms ease",
            ...ringStyle("link", "underline"),
          }}
        >
          Inline link
        </a>
        <div
          {...focusProps("card")}
          tabIndex={0}
          style={{
            padding: "12px 14px",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            background: "var(--bg-card)",
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--fg-muted)",
            transition: "outline-offset 100ms ease, box-shadow 100ms ease",
            ...ringStyle("card"),
          }}
        >
          Focusable card
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)", margin: 0 }}>
        {focused ? `focused: ${focused}` : "click an element or press Tab"}
      </p>
    </div>
  );
}

/*  Dynamic Island  */
type IslandState = "idle" | "ring" | "alarm" | "download" | "nav" | "message";
const ISLAND_DIMS: Record<IslandState, { w: number; h: number }> = {
  idle: { w: 126, h: 32 },
  ring: { w: 316, h: 84 },
  alarm: { w: 258, h: 74 },
  download: { w: 252, h: 76 },
  nav: { w: 252, h: 74 },
  message: { w: 288, h: 88 },
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
    setVis(false);
    setState(s);
    setTimeout(() => setVis(true), 120);
    if (s === "download") {
      setProg(0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 2600, 1);
        setProg(p * 100);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          autoRef.current = setTimeout(() => {
            setVis(false);
            setTimeout(() => setState("idle"), 180);
          }, 700);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      autoRef.current = setTimeout(() => {
        setVis(false);
        setTimeout(() => setState("idle"), 180);
      }, 3600);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(autoRef.current);
      cancelAnimationFrame(rafRef.current!);
    },
    [],
  );

  const { w, h } = ISLAND_DIMS[state];
  const R = 20;
  const circ = 2 * Math.PI * R;
  const dashOffset = circ * (1 - prog / 100);

  return (
    <div
      className="exp-demo"
      style={{ flexDirection: "column", gap: "18px", paddingTop: "6px" }}
    >
      <span className="exp-demo-label">dynamic island</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "104px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div className="d-island" style={{ width: `${w}px`, height: `${h}px` }}>
          <div
            className="d-island-content"
            data-visible={vis && state !== "idle"}
          >
            {state === "ring" && (
              <>
                <div className="d-island-avatar" style={{ background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center" }}><Phone weight="fill" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-muted">Incoming call</div>
                  <div className="d-island-title">Tatenda C.</div>
                  <div className="d-island-wave">
                    {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75, 1, 0.45, 0.65].map(
                      (amp, i) => (
                        <div
                          key={i}
                          style={{
                            height: `${amp * 100}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="d-island-actions">
                  <button
                    className="d-island-action danger"
                    onClick={() => activate("idle")}
                  >
                    End
                  </button>
                  <button
                    className="d-island-action accept"
                    onClick={() => activate("idle")}
                  >
                    Take
                  </button>
                </div>
              </>
            )}
            {state === "alarm" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><BellSimple weight="fill" size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div className="d-island-time">6:00</div>
                  <div className="d-island-muted">Morning alarm</div>
                </div>
                <div className="d-island-actions">
                  <button
                    className="d-island-action"
                    onClick={() => activate("idle")}
                  >
                    Snooze
                  </button>
                  <button
                    className="d-island-action"
                    onClick={() => activate("idle")}
                  >
                    Dismiss
                  </button>
                </div>
              </>
            )}
            {state === "download" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowDown weight="bold" size={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-title">Claude</div>
                  <div className="d-island-muted">Downloading...</div>
                </div>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  style={{ flexShrink: 0 }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,.15)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,.9)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 25 25)"
                    style={{ transition: "stroke-dashoffset 80ms linear" }}
                  />
                  <text
                    x="25"
                    y="25"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,.85)"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {Math.round(prog)}%
                  </text>
                </svg>
              </>
            )}
            {state === "nav" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><NavigationArrow weight="fill" size={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-muted">Turn right</div>
                  <div className="d-island-title">Baker St</div>
                  <div className="d-island-muted">in 200m</div>
                </div>
                <div className="d-island-eta">
                  <span>5</span>
                  <span>min</span>
                </div>
              </>
            )}
            {state === "message" && (
              <>
                <div className="d-island-avatar purple" style={{ background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}><ChatCircle weight="fill" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-title">Farai</div>
                  <div className="d-island-muted truncate">
                    are you still at the office?
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="d-island-controls">
        {(["ring", "alarm", "download", "nav", "message"] as IslandState[]).map(
          (s) => (
            <button
              key={s}
              className="d-island-btn"
              data-active={state === s}
              onClick={() => activate(s)}
            >
              {s === "ring"
                ? "Call"
                : s === "alarm"
                  ? "Alarm"
                  : s === "download"
                    ? "Download"
                    : s === "nav"
                      ? "Route"
                      : "Message"}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
/*  Resizable Panels  */
function ResizableDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [snapped, setSnapped] = useState(50);
  const dragging = useRef(false);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw = ((e.clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(80, Math.max(20, raw)));
  };

  const onUp = () => {
    dragging.current = false;
    const nearest = Math.round(split / 5) * 5;
    setSnapped(nearest);
    setSplit(nearest);
  };

  const panel = (label: string, content: React.ReactNode): React.CSSProperties => ({});

  return (
    <div className="exp-demo" style={{ padding: 0, overflow: "hidden" }}>
      <span className="exp-demo-label" style={{ zIndex: 10 }}>resizable panels</span>
      <div ref={containerRef} style={{ display: "flex", width: "100%", height: "100%", minHeight: "200px" }}>
        <div
          style={{
            width: `${split}%`,
            borderRight: "none",
            background: "var(--bg-subtle)",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            gap: "8px",
            overflow: "hidden",
            transition: dragging.current ? "none" : "width 200ms cubic-bezier(.23,1,.32,1)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)", flexShrink: 0 }}>Panel A · {split.toFixed(0)}%</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflow: "hidden" }}>
            {["Projects", "Components", "Assets", "Settings"].map((item) => (
              <div key={item} style={{ padding: "6px 8px", borderRadius: "5px", fontSize: "13px", color: "var(--fg-muted)", background: "var(--bg-hover)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item}</div>
            ))}
          </div>
        </div>
        <div
          className="d-resize-handle"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <ArrowsHorizontal size={12} style={{ color: "var(--fg-subtle)", pointerEvents: "none" }} />
        </div>
        <div
          style={{
            flex: 1,
            background: "var(--bg-card)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            overflow: "hidden",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)" }}>Panel B · {(100 - split).toFixed(0)}%</span>
          <div style={{ fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Drag the divider. Pointer capture keeps tracking outside the handle boundary. Releases snap to the nearest 5%.
          </div>
        </div>
      </div>
    </div>
  );
}

/*  Streaming Text  */
const STREAM_TEXTS = [
  "Building software that moves people is a craft, not a process.",
  "The best interfaces feel inevitable in hindsight.",
  "Every animation is a conversation between the interface and the user.",
  "Constraints are not the enemy of creativity. They are its engine.",
];

function StreamingDemo() {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [streaming, setStreaming] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const stream = useCallback((text: string) => {
    setDisplayed("");
    setStreaming(true);
    let i = 0;
    const tick = () => {
      if (i >= text.length) {
        setStreaming(false);
        return;
      }
      setDisplayed(text.slice(0, ++i));
      const ch = text[i - 1];
      const delay = /[.,!?]/.test(ch) ? 200 : /[ ]/.test(ch) ? 40 : 28;
      timerRef.current = setTimeout(tick, delay);
    };
    tick();
  }, []);

  useEffect(() => {
    stream(STREAM_TEXTS[0]);
    return () => clearTimeout(timerRef.current);
  }, [stream]);

  const next = useCallback(() => {
    clearTimeout(timerRef.current);
    const nextIdx = (textIdx + 1) % STREAM_TEXTS.length;
    setTextIdx(nextIdx);
    stream(STREAM_TEXTS[nextIdx]);
  }, [textIdx, stream]);

  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "20px", padding: "24px", alignItems: "stretch" }}>
      <span className="exp-demo-label">streaming text</span>
      <div style={{ minHeight: "72px", fontSize: "16px", lineHeight: 1.7, color: "var(--fg)", fontFamily: "var(--font-sans)" }}>
        {displayed}
        <span
          className="d-stream-cursor"
          style={{ opacity: streaming ? 1 : 0 }}
        />
      </div>
      <button
        onClick={next}
        style={{
          alignSelf: "flex-start",
          padding: "7px 14px",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--fg-muted)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {streaming ? "Streaming…" : <><ArrowRight size={13} /> Next</>}
      </button>
    </div>
  );
}

/*  View Transitions  */
const VT_ITEMS = [
  { id: 1, title: "Spring physics", sub: "Verlet integration", color: "#4F46E5" },
  { id: 2, title: "OKLCH color", sub: "Perceptual space", color: "#059669" },
  { id: 3, title: "Fluid type", sub: "CSS clamp()", color: "#B45309" },
];

function ViewTransitionDemo() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selected, setSelected] = useState<(typeof VT_ITEMS)[0] | null>(null);

  const go = (toView: "list" | "detail", item?: (typeof VT_ITEMS)[0]) => {
    const update = () => {
      if (item) setSelected(item);
      setView(toView);
    };
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(update);
    } else {
      update();
    }
  };

  return (
    <div className="exp-demo" style={{ padding: 0, overflow: "hidden" }}>
      <span className="exp-demo-label">view transitions</span>
      {view === "list" ? (
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
          {VT_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => go("detail", item)}
              style={{
                cursor: "pointer",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--bg-subtle)",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                viewTransitionName: `vt-item-${item.id}` as React.CSSProperties["viewTransitionName"],
              } as React.CSSProperties}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "14px", color: "var(--fg)", fontWeight: 500 }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}>{item.sub}</div>
              </div>
              <ArrowRight size={14} style={{ marginLeft: "auto", color: "var(--fg-subtle)" }} />
            </div>
          ))}
        </div>
      ) : selected ? (
        <div
          style={{
            padding: "20px",
            viewTransitionName: `vt-item-${selected.id}` as React.CSSProperties["viewTransitionName"],
            width: "100%",
          } as React.CSSProperties}
        >
          <div style={{ width: 48, height: 48, borderRadius: "12px", background: selected.color, marginBottom: "14px" }} />
          <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-.02em", marginBottom: "4px" }}>{selected.title}</div>
          <div style={{ fontSize: "13px", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)", marginBottom: "16px" }}>{selected.sub}</div>
          <button
            onClick={() => go("list")}
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--fg-muted)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeft size={13} /> Back
          </button>
        </div>
      ) : null}
    </div>
  );
}

/*
   CODE SNIPPETS
 */
const CODE: Record<ExpId, string> = {
  oklch: `<span class="cm">/* OKLCH interpolation — perceptual L stays constant */</span>
<span class="cm">/* sRGB: hsl(260,70%,55%) → hsl(160,70%,55%) — greys out in middle */</span>
background: linear-gradient(90deg,
  hsl(<span class="num">260</span>,<span class="num">70%</span>,<span class="num">55%</span>),
  hsl(<span class="num">160</span>,<span class="num">70%</span>,<span class="num">55%</span>));

<span class="cm">/* OKLCH: manual steps at L=0.65, C=0.18 */</span>
background: linear-gradient(90deg,
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">260</span>),
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">200</span>),
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">160</span>));

<span class="cm">/* Native in modern CSS — no JS needed */</span>`,

  "fluid-type": `<span class="cm">/* clamp(min, preferred, max) */</span>
.<span class="fn">heading</span> {
  font-size: <span class="fn">clamp</span>(
    <span class="num">1.75rem</span>,
    <span class="cm">/* slope × 100vw + intercept */</span>
    calc(<span class="num">1.75rem</span> + <span class="num">1.5</span> *
      ((100vw - <span class="num">20rem</span>) / (<span class="num">75</span> - <span class="num">20</span>))),
    <span class="num">3.25rem</span>
  );
}

<span class="cm">/* Same formula, different scale steps */</span>
.<span class="fn">body</span>    { font-size: <span class="fn">clamp</span>(<span class="num">0.9375rem</span>, calc(...), <span class="num">1.125rem</span>); }
.<span class="fn">caption</span> { font-size: <span class="fn">clamp</span>(<span class="num">0.75rem</span>,   calc(...), <span class="num">0.875rem</span>); }`,

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

  cmd: `<span class="cm">// Fuzzy match  typing "git" matches "Open GitHub"</span>
<span class="kw">function</span> <span class="fn">fuzzyMatch</span>(str: <span class="kw">string</span>, q: <span class="kw">string</span>) {
  <span class="kw">let</span> si = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> q.<span class="fn">toLowerCase</span>()) {
    <span class="kw">const</span> i = str.<span class="fn">toLowerCase</span>().<span class="fn">indexOf</span>(ch, si)
    <span class="kw">if</span> (i === -<span class="num">1</span>) <span class="kw">return false</span>
    si = i + <span class="num">1</span>
  }
  <span class="kw">return true</span>
}

<span class="cm">// Global K listener</span>
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

  toast: `<span class="cm">// Stack appearance  depth via scale + offset</span>
<span class="kw">const</span> fromTop = toasts.length - <span class="num">1</span> - i
style={{
  transform: \`translateY(\${fromTop * -<span class="num">9</span>}px)
    scale(\${<span class="num">1</span> - fromTop * <span class="num">0.05</span>})\`,
  opacity: <span class="num">1</span> - fromTop * <span class="num">0.18</span>,
  zIndex: i,
}}

<span class="cm">// Auto-dismiss after 3.5s</span>
<span class="fn">setTimeout</span>(() => <span class="fn">remove</span>(id), <span class="num">3500</span>)

<span class="cm">// Max 3 toasts in stack</span>
<span class="fn">setToasts</span>(prev => [...prev.<span class="fn">slice</span>(-<span class="num">2</span>), { id, msg, type }])`,

  drag: `<span class="cm">// Pointer capture  tracks outside element bounds</span>
<span class="kw">const</span> <span class="fn">onDown</span> = (e: PointerEvent) => {
  e.currentTarget.<span class="fn">setPointerCapture</span>(e.pointerId)
  startY.current = e.clientY - yRef.current
}

<span class="cm">// Velocity-based dismiss on release</span>
<span class="kw">const</span> <span class="fn">onUp</span> = () => {
  <span class="kw">if</span> (yRef.current > <span class="num">80</span> || vel.current > <span class="num">0.5</span>) {
    <span class="fn">dismiss</span>()   <span class="cm">// fast flick OR far drag</span>
  } <span class="kw">else</span> {
    <span class="fn">setY</span>(<span class="num">0</span>)    <span class="cm">// spring back</span>
  }
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
  <span class="prop">background</span>: var(--accent);
  <span class="prop">transform</span>: scale(<span class="num">1.1</span>);
  <span class="prop">transition</span>: transform <span class="num">150ms</span>
    cubic-bezier(.<span class="num">34</span>, <span class="num">1.56</span>, .<span class="num">64</span>, <span class="num">1</span>);
}`,

  dock: `<span class="cm">// Gaussian magnification falloff</span>
<span class="kw">const</span> <span class="fn">getScale</span> = (idx: <span class="kw">number</span>) => {
  <span class="kw">const</span> dist = Math.<span class="fn">abs</span>(mouseX - <span class="fn">iconCenter</span>(idx))
  <span class="kw">return</span> <span class="num">1</span> + (MAX - <span class="num">1</span>) *
    Math.<span class="fn">exp</span>(-(dist * dist) / ( * ))
}

<span class="cm">//  = 55  icon at 1 gap away  1.4</span>
<span class="cm">//  = 80  wider, softer falloff</span>
transform: \`translateY(\${-(s-<span class="num">1</span>)*BASE*<span class="num">0.5</span>}px)
  scale(\${s})\``,

  island: `<span class="cm">// One div  morph via width + height</span>
style={{
  <span class="prop">width</span>:  \`\${dims.w}px\`,
  <span class="prop">height</span>: \`\${dims.h}px\`,
  <span class="prop">borderRadius</span>: <span class="str">'100px'</span>,
  <span class="prop">background</span>: <span class="str">'#000'</span>,
  <span class="prop">transition</span>:
    <span class="str">'width 420ms cubic-bezier(.34,1.15,.64,1),'</span> +
    <span class="str">'height 420ms cubic-bezier(.34,1.15,.64,1)'</span>,
}}

<span class="cm">// Content fades in 160ms after morph starts</span>
opacity: vis && state !== <span class="str">'idle'</span> ? <span class="num">1</span> : <span class="num">0</span>,
transition: <span class="str">'opacity 180ms ease'</span>`,

  "spring-config": `<span class="cm">// Verlet integration — position + velocity per frame</span>
<span class="kw">const</span> <span class="fn">tick</span> = () => {
  <span class="kw">const</span> force =
    -stiffness * (pos - target)  <span class="cm">// restore</span>
    - damping * vel              <span class="cm">// resist</span>
  acc = force / mass
  vel += acc * dt
  pos += vel * dt
  <span class="fn">requestAnimationFrame</span>(tick)
}

<span class="cm">// Critical damping: no oscillation</span>
<span class="cm">// damping = 2 × √(stiffness × mass)</span>
<span class="cm">// Under-damped: bouncy  Over-damped: sluggish</span>`,

  "flip-list": `<span class="cm">// FLIP: First → Last → Invert → Play</span>

<span class="cm">// 1. Record First positions</span>
els.<span class="fn">forEach</span>((el, key) =>
  prev.<span class="fn">set</span>(key, el.<span class="fn">getBoundingClientRect</span>()))

<span class="cm">// 2. Mutate state — DOM moves to Last</span>
<span class="fn">setOrder</span>(<span class="fn">shuffle</span>(order))

<span class="cm">// 3. Invert: apply transform to Last → First</span>
<span class="kw">const</span> dy = old.top - cur.top
el.style.transform = \`translateY(\${dy}px)\`
el.style.transition = <span class="str">'none'</span>

<span class="cm">// 4. Play: remove transform, let CSS animate to 0</span>
<span class="fn">requestAnimationFrame</span>(() => {
  el.style.transform = <span class="str">''</span>
  el.style.transition = <span class="str">'transform 380ms cubic-bezier(.34,1.2,.64,1)'</span>
})`,

  "focus-ring": `<span class="cm">/* Custom focus ring — outline, never box-shadow */</span>
:focus-visible {
  <span class="cm">/* outline composites correctly; box-shadow clips */</span>
  <span class="prop">outline</span>: <span class="num">2px</span> solid var(--accent);
  <span class="prop">outline-offset</span>: <span class="num">2px</span>;
  <span class="prop">box-shadow</span>: <span class="num">0 0 0 4px</span>
    color-mix(<span class="kw">in</span> oklch, var(--accent) <span class="num">18%</span>, transparent);
}

<span class="cm">/* Pill gets a pill ring */</span>
.<span class="fn">btn-pill</span>:focus-visible {
  <span class="prop">outline-offset</span>: <span class="num">3px</span>;
  <span class="prop">border-radius</span>: <span class="num">100px</span>;
}

<span class="cm">/* Always use :focus-visible, not :focus */</span>
<span class="cm">/* :focus fires on click; :focus-visible only on keyboard */</span>`,

  resizable: `<span class="cm">// Pointer capture — tracks outside handle boundary</span>
<span class="kw">const</span> <span class="fn">onDown</span> = (e: PointerEvent) => {
  e.currentTarget.<span class="fn">setPointerCapture</span>(e.pointerId)
  dragging.current = <span class="kw">true</span>
}

<span class="kw">const</span> <span class="fn">onMove</span> = (e: PointerEvent) => {
  <span class="kw">if</span> (!dragging.current) <span class="kw">return</span>
  <span class="kw">const</span> pct = (e.clientX - rect.left) / rect.width * <span class="num">100</span>
  <span class="fn">setSplit</span>(Math.<span class="fn">min</span>(<span class="num">80</span>, Math.<span class="fn">max</span>(<span class="num">20</span>, pct)))
}

<span class="cm">// Snap to nearest 5% on release</span>
<span class="kw">const</span> <span class="fn">onUp</span> = () => {
  <span class="kw">const</span> nearest = Math.<span class="fn">round</span>(split / <span class="num">5</span>) * <span class="num">5</span>
  <span class="fn">setSplit</span>(nearest)
}`,

  streaming: `<span class="cm">// Variable delay — pause longer at punctuation</span>
<span class="kw">const</span> <span class="fn">tick</span> = () => {
  <span class="fn">setDisplayed</span>(text.<span class="fn">slice</span>(<span class="num">0</span>, ++i))
  <span class="kw">const</span> ch = text[i - <span class="num">1</span>]
  <span class="kw">const</span> delay =
    /[.,!?]/.test(ch) ? <span class="num">200</span>  <span class="cm">// end of clause</span>
    : /[ ]/.test(ch)  ? <span class="num">40</span>   <span class="cm">// word break</span>
    : <span class="num">28</span>               <span class="cm">// character</span>
  timer = <span class="fn">setTimeout</span>(tick, delay)
}

<span class="cm">// Blinking cursor via CSS animation</span>
.<span class="fn">cursor</span> {
  <span class="prop">animation</span>: blink <span class="num">900ms</span> step-end infinite;
}`,

  "view-transition": `<span class="cm">// Wrap state update in a View Transition</span>
<span class="kw">const</span> <span class="fn">navigate</span> = (item: Item) => {
  <span class="kw">if</span> (document.<span class="fn">startViewTransition</span>) {
    document.<span class="fn">startViewTransition</span>(() =>
      <span class="fn">setState</span>(item))
  } <span class="kw">else</span> {
    <span class="fn">setState</span>(item) <span class="cm">// fallback</span>
  }
}

<span class="cm">/* Named elements morph automatically */</span>
.<span class="fn">item</span> { view-transition-name: item-1 }

<span class="cm">/* Override default cross-fade */</span>
::view-transition-old(<span class="fn">item-1</span>) {
  <span class="prop">animation</span>: slide-out <span class="num">200ms</span> ease;
}`,
};

const DEMOS: Record<ExpId, React.FC> = {
  oklch: OklchDemo,
  "fluid-type": FluidTypeDemo,
  "var-font": VarFontDemo,
  "cursor-trail": CursorTrailDemo,
  "tilt-card": TiltCardDemo,
  cmd: CmdDemo,
  mag: MagDemo,
  toast: ToastDemo,
  drag: DragDemo,
  checkbox: CheckboxDemo,
  dock: DockDemo,
  island: IslandDemo,
  "spring-config": SpringConfigDemo,
  "flip-list": FlipListDemo,
  "focus-ring": FocusRingDemo,
  resizable: ResizableDemo,
  streaming: StreamingDemo,
  "view-transition": ViewTransitionDemo,
};

export const EXPERIMENT_SLUGS: Record<ExpId, string> = {
  oklch: "oklch-color",
  "fluid-type": "fluid-typography",
  "var-font": "variable-font-morph",
  "cursor-trail": "cursor-trail",
  "tilt-card": "tilt-card",
  cmd: "command-menu",
  mag: "magnetic-button",
  toast: "toast-notifications",
  drag: "drag-to-dismiss",
  checkbox: "checkbox-animation",
  dock: "macos-dock",
  island: "dynamic-island",
  "spring-config": "spring-configurator",
  "flip-list": "flip-animation",
  "focus-ring": "focus-ring-system",
  resizable: "resizable-panels",
  streaming: "streaming-text",
  "view-transition": "view-transitions",
};

export function getExperimentPath(exp: Exp) {
  return `/experiments/${EXPERIMENT_SLUGS[exp.id]}`;
}

export function getExperimentBySlug(slug: string) {
  return EXPS.find(
    (exp) => EXPERIMENT_SLUGS[exp.id] === slug || exp.id === slug,
  );
}

/*
   MAIN COMPONENT
 */
export default function Experiments() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="exp-section" ref={sectionRef}>
      <nav className="exp-journal-list" aria-label="Experiments">
        {EXPS.map((exp, index) => (
          <Link
            className="exp-journal-row"
            href={getExperimentPath(exp)}
            key={exp.id}
          >
            <span className="exp-journal-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="exp-journal-copy">
              <span className="exp-journal-title">{exp.name}</span>
              <span className="exp-journal-desc">{exp.desc}</span>
            </span>
            <span className="exp-journal-date">{exp.date}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}

export function ExperimentDemoBlock({ id }: { id: ExpId }) {
  const DemoComponent = DEMOS[id];

  return (
    <div className="exp-card exp-mdx-demo" id="exp-stage">
      <div className="exp-pane show">
        <DemoComponent />
      </div>
    </div>
  );
}

export function ExperimentSourceBlock({ id }: { id: ExpId }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="exp-source-block">
      <button
        aria-expanded={open}
        className="exp-source-toggle"
        onClick={() => setOpen((value) => !value)}
      >
        Source
      </button>
      {open ? (
        <div className="exp-code-pane">
          <div
            className="exp-code-inner"
            dangerouslySetInnerHTML={{ __html: CODE[id] }}
          />
        </div>
      ) : null}
    </div>
  );
}

export function ExperimentArticle({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  const current = getExperimentBySlug(slug);

  if (!current) {
    return (
      <section id="exp-section">
        <div className="exp-empty">
          <p>Experiment not found.</p>
          <Link href="/experiments">Back to experiments</Link>
        </div>
      </section>
    );
  }

  const currentIndex = EXPS.findIndex((exp) => exp.id === current.id);
  const previous = EXPS[currentIndex - 1];
  const next = EXPS[currentIndex + 1];

  return (
    <section id="exp-section">
      <article className="exp-article">
        <nav className="exp-article-nav" aria-label="Experiment navigation">
          <Link href="/experiments" className="exp-article-all">
            Experiments
          </Link>
          <div className="exp-article-links">
            {previous ? (
              <Link href={getExperimentPath(previous)}>Previous</Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link href={getExperimentPath(next)}>Next</Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </nav>

        <div className="exp-article-main">
          <div className="exp-current">
            <div className="exp-current-kicker">
              <span>{current.date}</span>
            </div>
            <h1 className="exp-current-title">{current.name}</h1>
            <p className="exp-current-detail">{current.detail}</p>
          </div>
          <div className="exp-mdx-body">{children}</div>
        </div>
      </article>
    </section>
  );
}

export function ExperimentDetailPage({ slug }: { slug: string }) {
  const current = getExperimentBySlug(slug);

  if (!current) {
    return (
      <ExperimentArticle slug={slug}>
        <span />
      </ExperimentArticle>
    );
  }

  return (
    <ExperimentArticle slug={slug}>
      <ExperimentDemoBlock id={current.id} />
      <ExperimentSourceBlock id={current.id} />
    </ExperimentArticle>
  );
}
