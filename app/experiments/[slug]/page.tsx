import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ExperimentDetailPage,
  ExperimentArticle,
  getExperimentBySlug,
  EXPERIMENT_SLUGS,
} from "@/components/sections/Experiments";
import { experimentContent } from "@/content/experiments/registry";

type ExperimentRouteProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return Object.values(EXPERIMENT_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExperimentRouteProps): Promise<Metadata> {
  const exp = getExperimentBySlug(params.slug);
  if (!exp) return {};
  return {
    title: `${exp.name} — Tatenda Chinyamakobvu`,
    description: exp.desc,
  };
}

export default async function ExperimentRoute({
  params,
}: ExperimentRouteProps) {
  const loader = experimentContent[params.slug];

  const inner = loader ? (
    await (async () => {
      const { default: Content } = await loader();
      return (
        <ExperimentArticle slug={params.slug}>
          <Content />
        </ExperimentArticle>
      );
    })()
  ) : (
    <ExperimentDetailPage slug={params.slug} />
  );

  return (
    <>
      <div className="wrap exp-route-wrap">
        <ThemeToggle />
        {inner}
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
