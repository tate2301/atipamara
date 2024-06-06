import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import path from "path";
import fs from "fs";

export const metadata: Metadata = {
  title: "Photos - Atipamara",
  description:
    "Atipamara is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
};

export default function Page() {
  const photosDirectory = path.join(process.cwd(), "public/assets/photos");
  const photoFiles = fs.readdirSync(photosDirectory);

  // Create an array to store the photo URLs
  const photoUrls = photoFiles.map((file) => `/assets/photos/${file}`);

  return (
    <>
      <div className="h-full max-w-2xl mx-auto pb-32 pt-16 p-4">
        <div>
          <h1
            className={clsx(
              "text-5xl font-bold tracking-tight mb-2 bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-400 bg-clip-text text-transparent",
            )}
          >
            Photos
          </h1>
          <p className="text-lg">
            Life is great, capture the moments. These are photos of me, my
            favorite people, pups and some memories.
          </p>
        </div>
      </div>
      <div className="space-y-24 border-t border-dashed border-zinc-400/20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:container 2xl:mx-auto gap-4 mb-16 p-4">
          {photoUrls.map((photoUrl) => (
            <li
              key={photoUrl}
              className="relative aspect-[9/11] rounded-xl overflow-hidden bg-zinc-900/10"
            >
              <Image
                src={photoUrl}
                fill
                className="object-cover"
                alt={"My pic"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
