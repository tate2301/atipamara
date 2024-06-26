import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import PlaygroundPreview from "@/components/ui/Playground";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Metadata } from "next";
import GridProfileCards from "@/components/Playground/GridProfileCards";
import NavigationFloatingBarPlay from "@/components/Playground/NavigationFloatingBar";

export const metadata: Metadata = {
  title: "Interaction Playground",
  description:
    "Atipamara is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
};

export default function Page() {
  return (
    <div className="h-full max-w-2xl mx-auto pb-32 pt-16 p-4">
      <div className="mb-32">
        <h1
          className={clsx(
            "text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br dark:from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent",
          )}
        >
          Interaction Playground
        </h1>
        <p className="text-lg">
          Built from my ideas, inspiration from great work and rebuilding
          interesting experiences
        </p>
      </div>
      <div className="space-y-24 border-t border-dashed border-zinc-400/20 pt-32">
        <PlaygroundPreview
          title="Apple iPhone 15 Bottom Bar"
          description="Inspired by the Apple iPhone 15 product page."
        >
          <ButtonWithDisclosure
            color="#fff"
            accentColor=""
            backgroundColor="#000"
            text="Learn more about our framework"
            icon={<QuestionMarkCircleIcon className="w-6 h-6 text-[#202020]" />}
          >
            <div className="bg-white p-8 rounded-lg">
              <h1 className="text-2xl font-bold">Add a new item</h1>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                et metus nec nisl.
              </p>
            </div>
          </ButtonWithDisclosure>
        </PlaygroundPreview>
        <NavigationFloatingBarPlay />
        <PlaygroundPreview
          title="Image stack"
          description="Inspired by Family iOS app interactions."
        >
          <GridProfileCards />
        </PlaygroundPreview>
      </div>
    </div>
  );
}
