"use client";

import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import PlaygroundPreview from "@/components/ui/Playground";
import DynamicIslandPlayground from "@/components/Playground/DynamicIslandPlayground";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { GeistMono } from "geist/font/mono";
import clsx from "clsx";
import { Metadata } from "next";
import GridProfileCards from "@/components/Playground/GridProfileCards";
import UnderDevelopment from "@/components/UnderDevelopment";

// export const metadata: Metadata = {
//   title: "Interaction Playground",
//   description:
//     "Tatenda Christopher Chinyamakobvu is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
// };

export default function Page() {
  return (
    <div className="h-full max-w-2xl mx-auto pb-32 pt-16 p-4">
      <div className="mb-32">
        <h1
          className={clsx(
            "text-5xl font-bold tracking-tight mb-2 bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-400 bg-clip-text text-transparent",
          )}
        >
          Writing
        </h1>
        <p className="text-lg">
          This is the best way to express my thoughts and ideas
        </p>
      </div>
      <div className="space-y-24 border-t border-dashed border-zinc-400/20 pt-32">
        <UnderDevelopment />
      </div>
    </div>
  );
}
