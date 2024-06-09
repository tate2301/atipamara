"use client";
import { cn } from "@/lib/utils";
import {
  CameraIcon,
  HomeIcon,
  PencilIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import FloatingNavbarDotContainer from "../ui/navbar/FloatingNavbarContainer";

const dynamicIslandNavbar = [
  {
    icon: <HomeIcon className="w-6 h-6" />,
    text: "Home",
    href: "/",
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    text: "Playground",
    href: "/playground",
  },
  {
    icon: <PencilIcon className="w-6 h-6" />,
    text: "Writing",
    href: "/writing",
  },
  {
    icon: <CameraIcon className="w-6 h-6" />,
    text: "Photos",
    href: "/photos",
  },
];

export default function DynamicNavbar() {
  const navigate = useRouter();
  const path = usePathname();

  const handleClick = (idx: number) => {
    navigate.push(dynamicIslandNavbar[idx].href);
  };

  useEffect(() => {
    const currentIdx = dynamicIslandNavbar.findIndex(
      (item) => item.href === path,
    );
    if (currentIdx === -1) return;

    // navigate with arrows
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentIdx === dynamicIslandNavbar.length - 1) return;
        navigate.push(dynamicIslandNavbar[currentIdx + 1].href);
      } else if (e.key === "ArrowLeft") {
        if (currentIdx === 0) return;
        navigate.push(dynamicIslandNavbar[currentIdx - 1].href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [path]);

  return (
    <header className="fixed inset-x-0 z-30 bottom-6 flex justify-center">
      <FloatingNavbarDotContainer
        active={dynamicIslandNavbar.findIndex((item) => item.href === path)}
        items={dynamicIslandNavbar}
        onClick={handleClick}
        className="bg-[#0588F0] text-white border border-[#2979bb] border-opacity-30"
      />
    </header>
  );
}
