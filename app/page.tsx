import type { Metadata } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Fade from "@/components/memoir/Fade";
import PhotoPile from "@/components/memoir/PhotoPile";
import { Chip, Sticker, Aside, KindIcon } from "@/components/memoir/Ink";
import { notes } from "@/app/notes/notes";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu",
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

  const stickersDirectory = path.join(process.cwd(), "public/stickers");
  const sticker = (name: string) =>
    fs.existsSync(path.join(stickersDirectory, `${name}.png`))
      ? `/stickers/${name}.png`
      : undefined;

  return (
    <main className="memoir">
      <div className="memoir-toggle">
        <ThemeToggle />
      </div>

      <Fade>
        <header className="memoir-masthead">
          <h1 className="memoir-name">Tatenda Chinyamakobvu</h1>
          <hr className="memoir-rule" />
          <p className="memoir-lede">
            Where I come from, what I&apos;ve built, what I make of it, and
            where I&apos;m going.
          </p>
        </header>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">I</span>
          <p className="memoir-first">
            I grew up in Zimbabwe, writing code for fun. Fifteen years later
            I&apos;m still that kid. People pay me now, and the stakes are
            higher.
            <Sticker
              src={sticker("zimbabwe")}
              side="left"
              top="-52px"
              size={124}
              rotate={-7}
              caption="home"
            />
            <Sticker
              src={sticker("computer")}
              side="right"
              top="4px"
              size={112}
              rotate={6}
              caption="the beginning"
            />
          </p>
          <p>
            Zimbabwe teaches you what no tutorial can. The internet is
            negotiable. Power is negotiable. Software that only works in
            perfect conditions doesn&apos;t work. That lesson got into my
            taste early and never left.
          </p>
          <p>
            The apprenticeship came fast: a buy-on-credit feature at{" "}
            <Chip href="https://www.techzim.co.zw" logo="/logos/techzim.co.zw.png">
              Techzim
            </Chip>
            , contract work for{" "}
            <Chip href="https://www.22seven.com" logo="/logos/22seven.com.png">
              22seven
            </Chip>
            , a{" "}
            <Aside note="Multichain, with a subgraph indexing their market contracts. My crypto phase. We all had one.">
              token bridge
            </Aside>{" "}
            at TreatDAO. I entered hackathons the way other people play
            weekend sport. Won one, placed ninth of a hundred and fifty in
            another, took a bronze in a third.
            <Sticker
              src={sticker("trophy")}
              side="right"
              top="52%"
              size={104}
              rotate={7}
              caption="ZWL$1,000,000"
            />
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">II</span>
          <p>
            The work I&apos;m proudest of is the least glamorous. Through{" "}
            <Chip href="https://corelith.pagka.dev" icon="corelith">
              Corelith
            </Chip>
            , three companies run their days on software I built from scratch:
            a grocer, a scrap-metal recycler, a mine. Payroll, stock, an audit
            log no one can quietly edit. It loads its offline workspace before
            its dashboard, because here it has to.
            <Sticker
              src={sticker("mine")}
              side="left"
              top="30%"
              size={116}
              rotate={-8}
              caption="yes, an actual mine"
            />
          </p>
          <p>
            Businesses don&apos;t run on clever code. They run on boring code
            that refuses to fall over. The parts most engineers skip are the
            parts a business actually feels, so those are the parts I build
            first.
          </p>
          <p>
            At{" "}
            <Chip href="https://afrisight.com" logo="/logos/afrisight.com.png">
              Afrisight
            </Chip>{" "}
            I built CXanalytics: the brand, the dashboard, the survey
            targeting. I shipped the mobile app panelists across Africa use
            every day, built so a survey survives a dropped tower. When I
            left, they brought me back to build the{" "}
            <Aside note="Stripe Sigma, but for survey answers.">
              query engine
            </Aside>
            .
            <Sticker
              src={sticker("tower")}
              side="right"
              top="8%"
              size={100}
              rotate={5}
              caption="it happens a lot"
            />
          </p>
          <p>
            The rest is curiosity with a commit history.{" "}
            <Chip
              href="https://github.com/tate2301/paynow-react"
              logo="/logos/paynow.co.zw.png"
            >
              paynow-react
            </Chip>{" "}
            quietly became the standard React integration for Zimbabwe&apos;s
            payment gateway. The{" "}
            <Chip href="https://github.com/tate2301/paas-platform" icon="github">
              self-hosted Heroku
            </Chip>{" "}
            exists because you don&apos;t understand a system until
            you&apos;ve built one.
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">III</span>
          <p>
            Corelith is the long project: software Zimbabwean businesses trust
            with their day. I want to build the kind of company you only hear
            about because everything works.
          </p>
          <p>
            The rest is people. Student founders at the{" "}
            <Chip
              href="https://buildwithtif.xyz"
              logo="/logos/buildwithtif.xyz.png"
            >
              CUT Innovation Hub
            </Chip>
            , and small useful things kept public.
          </p>
          <p>
            I&apos;m available for work worth doing well.{" "}
            <Chip href="mailto:thehalfstackdev@gmail.com" icon="email">
              thehalfstackdev@gmail.com
            </Chip>
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">IV</span>
          <p className="memoir-photos-intro">
            Not everything worth keeping is work. Favourite people, pups,
            moments.
            <Sticker
              src={sticker("pup")}
              side="right"
              top="-34px"
              size={108}
              rotate={8}
              caption="the pups"
            />
          </p>
          <PhotoPile photos={photos} />
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">V</span>
          <p className="memoir-appendix-intro">
            Notes. Some written, some built. The built ones you can touch.
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
                  <KindIcon kind={n.kind} />
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
            <Chip href="https://github.com/tate2301" icon="github">
              github
            </Chip>
            <Chip href="https://twitter.com/atipamara" icon="x">
              x
            </Chip>
            <Chip
              href="https://www.upwork.com/freelancers/tatendachinyamakobvu"
              icon="upwork"
            >
              upwork
            </Chip>
            <Chip href="mailto:thehalfstackdev@gmail.com" icon="email">
              email
            </Chip>
          </div>
          <p className="memoir-colophon">Made in Harare.</p>
        </footer>
      </Fade>
    </main>
  );
}
