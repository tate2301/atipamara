import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import PlaygroundPreview from "@/components/ui/Playground";
import DynamicIsland from "@/components/ui/DynamicIsland";
import DynamicIslandPlayground from "@/components/Playground/DynamicIslandPlayground";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <div className="h-full max-w-5xl mx-auto py-64 p-4">
      <div className="mb-32">
        <h1 className="text-8xl font-bold tracking-tight max-w-xl mb-6">
          Small Interaction Experiments
        </h1>
        <p className="text-lg">
          Built from my ideas, inspiration from great work and rebuilding
          interesting experiences
        </p>
      </div>
      <div className="space-y-24">
        <PlaygroundPreview
          title="Apple iPhone 15 Bottom Bar"
          description="Inspired by the Apple iPhone 15 product page."
        >
          <ButtonWithDisclosure
            color="#fff"
            accentColor=""
            backgroundColor="#202020"
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
        <DynamicIslandPlayground />
      </div>
    </div>
  );
}
