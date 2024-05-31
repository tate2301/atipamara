"use client";
import useForceRerender from "@/hooks/useForceRerender";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";

export default function PlaygroundPreview(props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { key, forceRerender } = useForceRerender();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div
        key={key}
        className="max-w-xl justify-center items-center flex flex-col border bg-white p-16 pb-8 rounded-xl relative space-y-16"
      >
        <AnimatePresence>{props.children}</AnimatePresence>
        <button
          onClick={forceRerender}
          className="bottom-3 font-semibold text-sm mx-auto px-4 h-8 rounded-full bg-zinc-50 border border-zinc-400/20 shadow-sm flex items-center"
        >
          Reset
          <ArrowPathIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
