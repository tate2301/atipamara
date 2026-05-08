import type { ComponentType } from "react";

type MDXImporter = () => Promise<{ default: ComponentType }>;

export const experimentContent: Partial<Record<string, MDXImporter>> = {
  "dynamic-island": () => import("./dynamic-island.mdx"),
  "macos-dock": () => import("./macos-dock.mdx"),
  "drag-to-dismiss": () => import("./drag-to-dismiss.mdx"),
  "command-menu": () => import("./command-menu.mdx"),
  "spring-configurator": () => import("./spring-configurator.mdx"),
  "oklch-color": () => import("./oklch-color.mdx"),
  "fluid-typography": () => import("./fluid-typography.mdx"),
  "flip-animation": () => import("./flip-animation.mdx"),
  "tilt-card": () => import("./tilt-card.mdx"),
  "variable-font-morph": () => import("./variable-font-morph.mdx"),
  "focus-ring-system": () => import("./focus-ring-system.mdx"),
};
