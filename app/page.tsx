import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";

import { Newsreader } from "next/font/google";

const serif = Newsreader({
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: "Tatenda C Chinyamakobvu - Design Engineer",
  description:
    "Tatenda Christopher Chinyamakobvu is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
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
        <h1 className="leading-relaxed mb-6">Projects</h1>
        <div className="flex flex-col space-y-4 relative">
          <ProjectCard
            title="paynow react"
            description="A react wrapper for the Paynow SDK"
            link="https://github.com/tate2301/paynow-react"
          />
          <ProjectCard
            title="redux persist nedb"
            description="Persist redux store to NeDB. Built for use with Electron."
            link="https://github.com/tate2301/redux-persist-nedb"
          />
          <ProjectCard
            title="MQTT quickstart template"
            description="Starter template for building MQTT applications with Node.js"
            link="https://github.com/tate2301/mqtt-starter"
          />
        </div>
      </div>

      <div>
        <h1 className="leading-relaxed mb-6">UI Explorations</h1>
        <div className="space-y-4 flex flex-col">
          <ProjectCard
            title="Apple iPhone 15 marketing bottom bar"
            description="An attempt at recreating the more button on the Apple iPhone 15 marketing page."
            link="/playground"
          />
          <ProjectCard
            title="Family profile grid"
            description="A grid of profiles with a hover effect. Inspired by the Family app."
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

const ProjectCard = (props: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Link href={props.link}>
      <p className="text-[#202020] font-medium leading-relaxed capitalize">
        {props.title}
      </p>
      <p>{props.description}</p>
    </Link>
  );
};
