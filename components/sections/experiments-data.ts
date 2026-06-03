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

type ExpMeta = { id: ExpId; name: string; desc: string };

export const EXPERIMENT_META: Record<string, ExpMeta> = {
  "oklch-color": {
    id: "oklch",
    name: "OKLCH Color Mixer",
    desc: "Gradient interpolation in perceptual OKLCH vs sRGB — the difference is stark.",
  },
  "fluid-typography": {
    id: "fluid-type",
    name: "Fluid Typography",
    desc: "A type scale that flows between min and max with CSS clamp() — no breakpoints.",
  },
  "variable-font-morph": {
    id: "var-font",
    name: "Variable Font Morph",
    desc: "Font weight and width axes animate on hover, morphing between states.",
  },
  "cursor-trail": {
    id: "cursor-trail",
    name: "Cursor Trail",
    desc: "A trail of fading dots follows the cursor with spring lag between each node.",
  },
  "tilt-card": {
    id: "tilt-card",
    name: "Tilt Card",
    desc: "A card that tilts in 3D toward the cursor, with a specular highlight that moves.",
  },
  "command-menu": {
    id: "cmd",
    name: "Command Menu",
    desc: "A Cmd K command palette with fuzzy search, grouped results, and keyboard navigation.",
  },
  "magnetic-button": {
    id: "mag",
    name: "Magnetic Button",
    desc: "A button that pulls toward the cursor with elastic spring return.",
  },
  "toast-notifications": {
    id: "toast",
    name: "Toast Notifications",
    desc: "Stacked notifications that slide in, queue behind each other, and auto-dismiss.",
  },
  "drag-to-dismiss": {
    id: "drag",
    name: "Drag to Dismiss",
    desc: "A card that tracks pointer drag and dismisses when thrown far enough.",
  },
  "checkbox-animation": {
    id: "checkbox",
    name: "Checkbox Animation",
    desc: "A checkmark that draws itself with a spring on check, strikethrough on complete.",
  },
  "macos-dock": {
    id: "dock",
    name: "macOS Dock",
    desc: "Icons magnify as the cursor approaches, with Gaussian distance falloff.",
  },
  "dynamic-island": {
    id: "island",
    name: "Dynamic Island",
    desc: "Apple's Dynamic Island with five Live Activity states.",
  },
  "spring-configurator": {
    id: "spring-config",
    name: "Spring Configurator",
    desc: "Tune stiffness, damping, and mass — watch the spring curve respond in real time.",
  },
  "flip-animation": {
    id: "flip-list",
    name: "FLIP Animation",
    desc: "List items animate to new positions using the FLIP technique — no layout thrash.",
  },
  "focus-ring-system": {
    id: "focus-ring",
    name: "Focus Ring System",
    desc: "Custom focus indicators that feel designed — not browser defaults, not invisible.",
  },
  "resizable-panels": {
    id: "resizable",
    name: "Resizable Panels",
    desc: "Drag the divider to resize two panels — pointer capture, min/max constraints.",
  },
  "streaming-text": {
    id: "streaming",
    name: "Streaming Text",
    desc: "Characters render one at a time as if arriving from a stream, with variable delay.",
  },
  "view-transitions": {
    id: "view-transition",
    name: "View Transitions",
    desc: "Shared-element morphing between list and detail views using the native browser API.",
  },
};

export function getExperimentMeta(slug: string): ExpMeta | undefined {
  return EXPERIMENT_META[slug];
}
