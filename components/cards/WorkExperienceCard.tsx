import Link from "next/link";

const WorkExperienceCard = (props: {
  title: string;
  description: string;
  link: string;
  timeline: string;
}) => {
  // timeline should be a string like "2020 - 2020" or "2020 - Present" or "2020 - 2021"
  // remove any other characters
  let timeline = props.timeline.replace(/[^0-9\s-]/g, "");
  if (props.timeline.includes("Present")) {
    timeline += " Present";
  }
  return (
    <Link href={props.link} className="flex gap-8">
      <p className="text-sm leading-relaxed capitalize w-32 flex-shrink-0">
        {timeline}
      </p>
      <div>
        <p className="text-[#202020] font-medium leading-relaxed capitalize mb-2">
          {props.title}
        </p>
        <p className="text-balance">{props.description}</p>
      </div>
    </Link>
  );
};

export default WorkExperienceCard;
