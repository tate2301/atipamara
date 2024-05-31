import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tatenda C Chinyamakobvu - Design Engineer",
  description:
    "Tatenda Christopher Chinyamakobvu is a design engineer based in Harare, Zimbabwe. He helps startups, founders, and their teams to realize their full potential through thoughtful design and engineering.",
};

export default function About() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-32 py-32 px-4">
      <div>
        <h1 className="leading-relaxed mb-6">Today</h1>
        <p className="leading-relaxed mb-4">
          I work as a design engineer with the Innovation Hub at the Chinhoyi
          University of Technology. I help startups, founders, and their teams
          to realize their full potential through thoughtful design and
          engineering.
        </p>
        <p>
          In the past I worked with a few startups and companies as a freelance
          frontend developer and product designer.
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
            title="Amie Action Bar"
            description="Recreating the action bar on the Amie app."
            link="/playground"
          />
        </div>
      </div>
      <div>
        <ButtonWithDisclosure
          backgroundColor="#EF5F00"
          color="#fff"
          accentColor="#fff"
          text="I'm available for work"
          icon={<ArrowUpRightIcon className="w-6 h-6 stroke-2" />}
        >
          <h1 className="text-3xl font-bold mb-2">
            Let&lsquo;s talk about your next project
          </h1>
          <p className="max-w-2xl text-balance">
            We are always excited to work with new people and help them bring
            their ideas to life. Book a call with us to discuss your project and
            how we can help you.
          </p>
        </ButtonWithDisclosure>
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
