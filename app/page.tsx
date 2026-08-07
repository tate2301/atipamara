import type { Metadata } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Fade from "@/components/memoir/Fade";
import PhotoPile from "@/components/memoir/PhotoPile";
import { notes } from "@/app/notes/notes";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu — Product Engineer",
  description:
    "A short memoir of things built and things learned. Product engineer in Harare, Zimbabwe.",
};

export default function Page() {
  const photosDirectory = path.join(process.cwd(), "public/assets/photos");
  const photos = fs
    .readdirSync(photosDirectory)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => `/assets/photos/${file}`);

  return (
    <main className="memoir">
      <div className="memoir-toggle">
        <ThemeToggle />
      </div>

      <Fade>
        <header className="memoir-masthead">
          <h1 className="memoir-name">Tatenda Chinyamakobvu</h1>
          <p className="memoir-role">Product Engineer · Harare, Zimbabwe</p>
          <hr className="memoir-rule" />
          <p className="memoir-lede">
            Where I come from, what I&apos;ve built, what I make of it, and
            where I&apos;m going.
          </p>
        </header>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">I</span>
            <span className="memoir-kicker-title">Where I come from</span>
          </span>
          <p className="memoir-first">
            I grew up in Zimbabwe, writing code for fun. Fifteen years on
            I&apos;m still that kid — people pay me now, and the stakes are
            higher.
          </p>
          <p>
            Zimbabwe teaches you what no tutorial can. The internet is
            negotiable. Power is negotiable. Software that only works in
            perfect conditions doesn&apos;t work. That lesson got into my
            taste early and never left.
          </p>
          <p>
            The apprenticeship came fast: a buy-on-credit feature at{" "}
            <a
              href="https://www.techzim.co.zw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Techzim
            </a>
            , contract work for{" "}
            <a
              href="https://www.22seven.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              22seven
            </a>
            , a token bridge at TreatDAO. Hackathons the way other people play
            sport — a first place, a ninth of a hundred and fifty, a bronze.
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">II</span>
            <span className="memoir-kicker-title">What I&apos;ve built</span>
          </span>
          <p>
            The work I&apos;m proudest of is the least glamorous. Through{" "}
            <a
              href="https://corelith.pagka.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Corelith
            </a>
            , three companies run their days on software I built from scratch
            — a grocer, a scrap-metal recycler, a mine. Payroll, stock, an
            audit log no one can quietly edit. It loads its offline workspace
            before its dashboard, because here it has to.
          </p>
          <p>
            Businesses don&apos;t run on clever code. They run on boring code
            that refuses to fall over. The parts most engineers skip are the
            parts a business actually feels — so those are the parts I build
            first.
          </p>
          <p>
            At{" "}
            <a
              href="https://afrisight.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Afrisight
            </a>{" "}
            I built CXanalytics — the brand, the dashboard, the
            survey-targeting algorithms — and the mobile app panelists across
            Africa use daily, made so a survey survives a dropped tower. When
            I left, they brought me back to build the query engine.
          </p>
          <p>
            The rest is curiosity with a commit history:{" "}
            <a
              href="https://github.com/tate2301/paynow-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              paynow-react
            </a>
            , quietly the standard React integration for Zimbabwe&apos;s
            payment gateway, and a{" "}
            <a
              href="https://github.com/tate2301/paas-platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              self-hosted Heroku
            </a>{" "}
            built for one reason — you don&apos;t understand a system until
            you&apos;ve built one.
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">III</span>
            <span className="memoir-kicker-title">Where I&apos;m going</span>
          </span>
          <p>
            Corelith is the long project: software Zimbabwean businesses trust
            with their day. I want to build the kind of company you only hear
            about because everything works.
          </p>
          <p>
            The rest is people — student founders at the{" "}
            <a
              href="https://buildwithtif.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              CUT Innovation Hub
            </a>
            , and small useful things kept public.
          </p>
          <p>
            I&apos;m available for work worth doing well.{" "}
            <a href="mailto:thehalfstackdev@gmail.com">
              thehalfstackdev@gmail.com
            </a>
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">IV</span>
            <span className="memoir-kicker-title">Photographs</span>
          </span>
          <p className="memoir-photos-intro">
            Not everything worth keeping is work. Favourite people, pups,
            moments.
          </p>
          <PhotoPile photos={photos} />
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">V</span>
            <span className="memoir-kicker-title">Appendix</span>
          </span>
          <p className="memoir-appendix-intro">
            Notes — some written, some built. The built ones, you can touch.
          </p>
          <div className="appendix-list">
            {notes.map((n) => (
              <Link
                key={n.slug}
                href={`/notes/${n.slug}`}
                className="appendix-row"
              >
                <span className="appendix-copy">
                  <span className="appendix-title">{n.title}</span>
                  <span className="appendix-line">{n.line}</span>
                </span>
                <span className="appendix-meta">
                  {n.kind === "interactive" ? "interactive" : "written"} ·{" "}
                  {n.date}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Fade>

      <Fade>
        <footer className="memoir-foot">
          <div className="memoir-foot-row">
            <a
              href="https://github.com/tate2301"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="https://twitter.com/atipamara"
              target="_blank"
              rel="noopener noreferrer"
            >
              x
            </a>
            <a
              href="https://www.upwork.com/freelancers/tatendachinyamakobvu"
              target="_blank"
              rel="noopener noreferrer"
            >
              upwork
            </a>
            <a href="mailto:thehalfstackdev@gmail.com">email</a>
          </div>
          <p className="memoir-colophon">
            Set in Libertinus Serif &amp; Atkinson Hyperlegible. Made in
            Harare.
          </p>
        </footer>
      </Fade>
    </main>
  );
}
