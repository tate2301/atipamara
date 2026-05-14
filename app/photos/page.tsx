import type { Metadata } from "next";
import Image from "next/image";
import path from "path";
import fs from "fs";
import SiteNav from "@/components/sections/SiteNav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Photos — Tatenda Chinyamakobvu",
  description:
    "A small archive of photos — favourite people, pups, and moments worth keeping.",
};

export default function Page() {
  const photosDirectory = path.join(process.cwd(), "public/assets/photos");
  const photoFiles = fs.readdirSync(photosDirectory);
  const photoUrls = photoFiles.map((file) => `/assets/photos/${file}`);

  return (
    <>
      <div className="wrap">
        <SiteNav />
        <div className="page-head">
          <h1 className="page-title">Photos</h1>
          <p className="page-desc">
            A small archive — favourite people, pups, and moments worth keeping.
          </p>
        </div>
        <section className="photos-grid">
          {photoUrls.map((photoUrl) => (
            <figure key={photoUrl} className="photos-item">
              <Image
                src={photoUrl}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="photos-img"
                alt=""
              />
            </figure>
          ))}
        </section>
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
