import Link from "next/link";

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

export default ProjectCard;
