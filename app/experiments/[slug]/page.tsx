import type { Metadata } from "next";
import type { ComponentType } from "react";
import Footer from "@/components/sections/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ExperimentDetailPage,
  ExperimentArticle,
  getExperimentBySlug,
  EXPERIMENT_SLUGS,
} from "@/components/sections/Experiments";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return Object.values(EXPERIMENT_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exp = getExperimentBySlug(params.slug);
  if (!exp) return {};
  return {
    title: `${exp.name} — Tatenda Chinyamakobvu`,
    description: exp.desc,
  };
}

async function loadMdx(slug: string): Promise<ComponentType | null> {
  try {
    switch (slug) {
      case "dynamic-island": {
        const m = await import("@/content/experiments/dynamic-island.mdx");
        return m.default;
      }
      case "macos-dock": {
        const m = await import("@/content/experiments/macos-dock.mdx");
        return m.default;
      }
      case "drag-to-dismiss": {
        const m = await import("@/content/experiments/drag-to-dismiss.mdx");
        return m.default;
      }
      case "command-menu": {
        const m = await import("@/content/experiments/command-menu.mdx");
        return m.default;
      }
      case "spring-configurator": {
        const m = await import("@/content/experiments/spring-configurator.mdx");
        return m.default;
      }
      case "oklch-color": {
        const m = await import("@/content/experiments/oklch-color.mdx");
        return m.default;
      }
      case "fluid-typography": {
        const m = await import("@/content/experiments/fluid-typography.mdx");
        return m.default;
      }
      case "flip-animation": {
        const m = await import("@/content/experiments/flip-animation.mdx");
        return m.default;
      }
      case "tilt-card": {
        const m = await import("@/content/experiments/tilt-card.mdx");
        return m.default;
      }
      case "variable-font-morph": {
        const m = await import("@/content/experiments/variable-font-morph.mdx");
        return m.default;
      }
      case "focus-ring-system": {
        const m = await import("@/content/experiments/focus-ring-system.mdx");
        return m.default;
      }
      case "cursor-trail": {
        const m = await import("@/content/experiments/cursor-trail.mdx");
        return m.default;
      }
      case "magnetic-button": {
        const m = await import("@/content/experiments/magnetic-button.mdx");
        return m.default;
      }
      case "toast-notifications": {
        const m = await import("@/content/experiments/toast-notifications.mdx");
        return m.default;
      }
      case "checkbox-animation": {
        const m = await import("@/content/experiments/checkbox-animation.mdx");
        return m.default;
      }
      case "resizable-panels": {
        const m = await import("@/content/experiments/resizable-panels.mdx");
        return m.default;
      }
      case "streaming-text": {
        const m = await import("@/content/experiments/streaming-text.mdx");
        return m.default;
      }
      case "view-transitions": {
        const m = await import("@/content/experiments/view-transitions.mdx");
        return m.default;
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export default async function ExperimentRoute({ params }: Props) {
  const Content = await loadMdx(params.slug);

  return (
    <>
      <div className="wrap exp-route-wrap">
        <ThemeToggle />
        {Content ? (
          <ExperimentArticle slug={params.slug}>
            <Content />
          </ExperimentArticle>
        ) : (
          <ExperimentDetailPage slug={params.slug} />
        )}
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
