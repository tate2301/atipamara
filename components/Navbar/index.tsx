"use client";
import { cn } from "@/lib/utils";
import {
  CameraIcon,
  HomeIcon,
  PencilIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { DynamicIsland } from "../Playground/DynamicIslandPlayground";
import { usePathname, useRouter } from "next/navigation";

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

  return (
    <header className="fixed inset-x-0 z-30 bottom-6 flex justify-center">
      <DynamicIsland
        active={dynamicIslandNavbar.findIndex((item) => item.href === path)}
        items={dynamicIslandNavbar}
        onClick={handleClick}
        className="bg-[#0588F0] text-white border border-[#2979bb]"
      />
    </header>
  );
}
