"use client";
import { useState } from "react";
import PlaygroundPreview from "../../ui/Playground";
import {
  BriefcaseIcon,
  DocumentIcon,
  GlobeAltIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import FloatingNavbarDotContainer from "@/components/ui/navbar/FloatingNavbarContainer";

const icons = [
  {
    icon: <HomeIcon className="w-6 h-6" />,
    text: "Home",
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    text: "Sparkles",
  },
  {
    icon: <DocumentIcon className="w-6 h-6" />,
    text: "Document",
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6" />,
    text: "Briefcase",
  },
  {
    icon: <GlobeAltIcon className="w-6 h-6" />,
    text: "Globe",
  },
];

export default function NavigationFloatingBarPlay() {
  const [active, setActive] = useState(2);

  const onSetActive = (index: number) => {
    setActive(index);
  };
  return (
    <PlaygroundPreview
      title="Dynamic Island Bottom Navigation"
      description="Inspired by the Apple Dynamic Island"
    >
      <FloatingNavbarDotContainer
        items={icons}
        active={active}
        onClick={onSetActive}
        className="bg-white border border-zinc-400/10"
      />
    </PlaygroundPreview>
  );
}
