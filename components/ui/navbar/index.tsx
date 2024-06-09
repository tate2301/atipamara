"use client";
import DynamicNavbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="max-w-2xl mx-auto pt-32 pb-6 px-4">
      <nav className="mb-10">
        <Link href={"/"}>
          <h1>Atipamara</h1>
          <p className="mb-4">Design — Engineer</p>
        </Link>
      </nav>
      <DynamicNavbar />

      {/* <nav className="flex gap-2 -mx-4">
      <Link
        href={"/"}
        className={cn(
          "rounded-full items-center flex h-[36px] px-4",
          pathname === "/" && "bg-zinc-900 text-white ",
        )}
      >
        Index
      </Link>
      <Link
        href={"/playground"}
        className={cn(
          "text-zinc-500 rounded-full items-center flex h-[36px] px-4",
          pathname === "/playground" && "bg-zinc-900 text-white ",
        )}
      >
        Playground
      </Link>
      <Link
        href={"/writing"}
        className={cn(
          "text-zinc-500 rounded-full items-center flex h-[36px] px-4",
          pathname === "/writing" && "bg-zinc-900 text-white ",
        )}
      >
        Writing
      </Link>
      <Link
        href={"/photos"}
        className={cn(
          "text-zinc-500 rounded-full items-center flex h-[36px] px-4",
          pathname === "/photos" && "bg-zinc-900 text-white ",
        )}
      >
        Photos
      </Link>
    </nav> */}
    </header>
  );
}
