import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";

import { Newsreader } from "next/font/google";
import ProjectCard from "@/components/cards/ProjectCard";
import WorkExperienceCard from "@/components/cards/WorkExperienceCard";

const serif = Newsreader({
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: "Atipamara - Design Engineer",
  description:
    "Atipamara is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
};

export default function About() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-32 py-32 px-4">
      <div>
        <h1 className="leading-relaxed mb-6">About me</h1>
        <p className="leading-relaxed mb-4">
          I work as a design engineer with the Innovation Hub at the Chinhoyi
          University of Technology. I help startups, founders, and their teams
          to realize their full potential through thoughtful design and
          engineering.
        </p>
        <p className="leading-relaxed">
          Over the past 6 years I worked with a few startups and companies
          across different roles ranging between frontend developer, fullstack
          developer, product designer and I won&#39;t forget the one experience
          where I won a{" "}
          <em className={serif.className} style={{ fontSize: "18px" }}>
            <a
              href="https://zindi.africa/competitions/umojahack-africa-2021-2-sendy-challenge-intermediate/leaderboard"
              target="_blank"
              rel="no-referrer"
            >
              Data Science challenge.
            </a>
          </em>
        </p>
      </div>

      <div>
        <h1 className="leading-relaxed mb-10">Projects</h1>
        <div className="flex flex-col space-y-4 relative">
          <ProjectCard
            title="paynow react"
            description="A react wrapper for the Paynow SDK"
            link="https://paynow.atipamara.xyz"
          />

          <ProjectCard
            title="redux persist nedb"
            description="Persist redux store to NeDB. Built for use with Electron."
            link="https://github.com/tate2301/redux-persist-nedb"
          />
          <ProjectCard
            title="Stopwatch"
            description="Implementing a stopwatch using a finite state machine"
            link="https://github.com/tate2301/stopwatch"
          />
          <ProjectCard
            title="Telescope"
            description="SaaS revenue projection tool"
            link="https://toolkit.atipamara.xyz"
          />
          <ProjectCard
            title="EcoCash JS"
            description="Javascript library for interacting with the Ecocash Instant Payments API"
            link="https://github.com/tate2301/ecocash-js"
          />
          <ProjectCard
            title="Snackbar"
            description="Boost your productivity with a supercharged task manager"
            link="https://snackbar.atipamara.xyz"
          />
        </div>
      </div>
      <div>
        <h1 className="leading-relaxed mb-10">Working experience</h1>
        <div className="space-y-10 flex flex-col">
          <WorkExperienceCard
            title="Design Engineer - CUT Innovation Hub"
            description="Helping student founders and startups design user-focused products. Mentored student developers at the Build With The Idea Factory cohort of 2023."
            link="https://buildwithtif.xyz"
            timeline="July 2023 - Present"
          />
          <WorkExperienceCard
            title="Senior Product Engineer - TreatDAO"
            description="Designed and led the team in developing the $TREAT multichain bridge. Worked with TheGraph to build an indexer for the TreatDAO market smart contracts."
            link="https://treatdao.org"
            timeline="December 2022 - April 2023"
          />
          <WorkExperienceCard
            title="Fullstack Web3 Developer - TreatDAO"
            description="Developed the TreatDAO NFT marketplace. Worked with the EVM to build a decentralized marketplace for NFTs on the Binance Smart Chain."
            link="https://treatdao.org"
            timeline="May 2022 - November 2022"
          />
          <WorkExperienceCard
            title="Contract Frontend Developer - 22Seven"
            description="Contracted to develop the marketing website for 22Seven. Powered by Headless Wordpress & Gatsby."
            link="https://www.22seven.com"
            timeline="June 2021 - July 2021"
          />
          <WorkExperienceCard
            title="Fullstack Developer - Techzim"
            description="Developed the Buy-on-credit feature for the Techzim market and laid out the groundwork for migrating to Headless Wordpress."
            link="https://www.techzim.co.zw"
            timeline="Jan 2021 - March 2021"
          />
          <WorkExperienceCard
            title="Soterio Team - Chinhoyi University of Technology"
            description="Led the development of the Soterio Contact Tracing app. Forked from the Australian Government's COVID-19 BLE based contact tracing app. Our efforts allowed Zimbabwean universities to re-open their doors to students and staff."
            link="https://www.cut.ac.zw"
            timeline="April 2020 - November 2020"
          />
          <WorkExperienceCard
            title="Product Designer - Tachom"
            description="Designing mobile apps and SaaS products for Tachom clients including, Vaai, Afrispark and ThothAI."
            link="https://www.devtachom.com"
            timeline="April 2019 - February 2020"
          />
        </div>
      </div>
      <div>
        <h1 className="leading-relaxed mb-10">UI Explorations</h1>
        <div className="space-y-4 flex flex-col">
          <ProjectCard
            title="Apple iPhone 15 marketing bottom bar"
            description="An attempt at recreating the more button on the Apple iPhone 15 marketing page."
            link="/playground"
          />
          <ProjectCard
            title="Animated image stack"
            description="A stack of profiles with a hover effect. Inspired by the Family app."
            link="/playground"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <ButtonWithDisclosure
          backgroundColor="#EF5F00"
          color="#fff"
          accentColor="#fff"
          text="I'm available for work"
          icon={<ArrowUpRightIcon className="w-6 h-6 stroke-2" />}
        >
          <h1 className="text-3xl font-bold mb-2">
            Let&lsquo;s talk about working together
          </h1>
          <p className="max-w-2xl text-balance">
            We are always excited to work with new people and help them bring
            their ideas to life. Book a call with us to discuss your project and
            how we can help you.
          </p>
        </ButtonWithDisclosure>

        <div>
          <p>
            See more of my work on{" "}
            <a href="https://twitter.com/atipamara" className="text-[#202020]">
              X
            </a>{" "}
            or check out my code on{" "}
            <a href="https://github.com/tate2301" className="text-[#202020]">
              GitHub
            </a>
            . Thanks for visiting.
          </p>
        </div>
      </div>
    </div>
  );
}
