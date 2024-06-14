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
        style={{
          boxShadow: "0px 4px 12px -6px rgba(0, 0, 0, 0.08)",
        }}
        className="max-w-xl justify-center items-center flex flex-col border border-zinc-400/30 bg-white dark:bg-zinc-900 dark:border-zinc-400/10 p-16 pb-8 rounded-xl relative space-y-16"
      >
        <AnimatePresence>{props.children}</AnimatePresence>
        <button
          onClick={forceRerender}
          className="bottom-3 font-bold text-sm mx-auto px-4 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 dark:text-white border border-zinc-400/10 shadow-sm flex items-center"
        >
          Reset
          <ArrowPathIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
