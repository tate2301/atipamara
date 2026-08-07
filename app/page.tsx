import type { Metadata } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Fade from "@/components/memoir/Fade";
import PhotoPile from "@/components/memoir/PhotoPile";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu — Product Engineer",
  description:
    "A short memoir of things built and things learned — where I come from, what I've made of it, and where I'm going. Product engineer in Harare, Zimbabwe.",
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
            This is less a portfolio than a short memoir — where I come from,
            what I&apos;ve built, what I make of it, and where I&apos;m going.
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
            I grew up in Zimbabwe, writing code for fun. There was no grand
            plan — just a kid pulling things apart to see how they worked.
            Fifteen years later I&apos;m still doing the same thing. The only
            differences are that people now pay me for it, and the stakes are
            a bit higher.
          </p>
          <p>
            Zimbabwe teaches you things about software that no tutorial will.
            The internet is negotiable. Power is negotiable. If your product
            only works under perfect conditions, it doesn&apos;t work. That
            constraint got into my taste early and never left: I build things
            that keep working when the connection drops, because here it will.
          </p>
          <p>
            The first years were the usual apprenticeship, compressed. I built
            the buy-on-credit feature at{" "}
            <a
              href="https://www.techzim.co.zw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Techzim
            </a>
            , did contract frontend work for{" "}
            <a
              href="https://www.22seven.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              22seven
            </a>{" "}
            in South Africa, and led development of a multichain token bridge
            at TreatDAO. I entered hackathons the way some people play sport —
            first place at POTRAZ&apos;s Hack4SmartCities in 2020 for a
            rapid-response safety app built on ambient sound, ninth of a
            hundred and fifty teams at UmojaHack Africa the next year, a
            bronze the year after that.
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">II</span>
            <span className="memoir-kicker-title">
              What I&apos;ve built, and what I think of it
            </span>
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
            , my studio, three companies run their businesses on software I
            built from scratch — a grocery retailer, a scrap-metal recycler,
            and a mining operation. Point of sale, payroll, stock, financial
            reporting, an append-only audit log. It loads its offline
            workspace before it loads the dashboard, because it has to.
          </p>
          <p>
            What I&apos;ve come to believe is that businesses don&apos;t run
            on clever code; they run on boring code that refuses to fall over.
            The parts most engineers skip — sync, permissions, audit trails,
            the CCTV camera grid that has to work from behind a NAT&apos;d
            connection — are the parts a business actually feels. I{" "}
            <a
              href="https://github.com/tate2301/mediamtx-rtsp-forwarder"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-sourced
            </a>{" "}
            the small bridge that carries those on-prem camera feeds to the
            browser, because someone else out there has the same problem.
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
            I was lead engineer on CXanalytics, their enterprise
            customer-experience product. I drew the brand from scratch, built
            the dashboard from a blank canvas, and wrote the targeting
            algorithms that decide which survey reaches which respondent. I
            also shipped the consumer mobile app that panelists across Africa
            use daily — built so a survey never loses progress when a tower
            drops. After I wrapped up full-time, they brought me back on
            contract to build a no-code query builder over their raw survey
            data: Stripe Sigma, applied to customer experience.
          </p>
          <p>
            The rest is curiosity with a commit history.{" "}
            <a
              href="https://github.com/tate2301/paynow-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              paynow-react
            </a>{" "}
            became the standard React integration for Zimbabwe&apos;s dominant
            payment gateway — never promoted, just useful. I built a{" "}
            <a
              href="https://github.com/tate2301/paas-platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              self-hosted Heroku alternative
            </a>{" "}
            not because the world needed another PaaS, but because the best
            way to understand a system is to build it yourself.
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
            Corelith is the long project: quiet, dependable software that
            Zimbabwean businesses run on — more tenants, more industries, the
            same refusal to fall over. I want it to be the kind of company you
            only hear about because everything works.
          </p>
          <p>
            The other half is people. At the{" "}
            <a
              href="https://buildwithtif.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              CUT Innovation Hub
            </a>{" "}
            I help student founders design and build products people actually
            want to use, and I intend to keep making small, useful things in
            public.
          </p>
          <p>
            I&apos;m available for work that&apos;s worth doing well. The
            fastest way to reach me is{" "}
            <a href="mailto:thehalfstackdev@gmail.com">
              thehalfstackdev@gmail.com
            </a>
            .
          </p>
        </section>
      </Fade>

      <Fade>
        <section className="memoir-chapter memoir-photos">
          <span className="memoir-kicker">
            <span className="memoir-kicker-num">IV</span>
            <span className="memoir-kicker-title">Photographs</span>
          </span>
          <p className="memoir-photos-intro">
            Every archive should keep something that isn&apos;t work. These
            are mine — favourite people, pups, and moments worth keeping.
          </p>
          <PhotoPile photos={photos} />
        </section>
      </Fade>

      <Fade>
        <footer className="memoir-foot">
          <nav className="memoir-foot-row" aria-label="Site">
            <Link href="/writing">writing</Link>
            <Link href="/experiments">experiments</Link>
            <Link href="/photos">photos</Link>
          </nav>
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
