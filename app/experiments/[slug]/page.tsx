import ExperimentArticle from "@/content/experiments/article.mdx";
import Footer from "@/components/sections/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";

type ExperimentRouteProps = {
  params: { slug: string };
};

export default function ExperimentRoute({ params }: ExperimentRouteProps) {
  return (
    <>
      <div className="wrap exp-route-wrap">
        <ThemeToggle />
        <ExperimentArticle slug={params.slug} />
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
