import Link from "next/link"

export default function() {
    return (
        <div className="max-w-2xl mx-auto p-4 space-y-32 py-32 px-4">
            <div>
                <h1 className="font-bold">Tatenda Christopher Chinyamakobvu</h1>
                <p>Design — Engineer</p>
            </div>
            <div>
                <h1 className="leading-relaxed mb-6">
                    Today
                </h1>
                <p className="leading-relaxed mb-4">
                    I work as a design engineer with the Innovation Hub at the Chinhoyi University of Technology. I help startups, founders, and their teams to realize their full potential through thoughtful design and engineering.
                </p>
                <p>
                    In the past I worked with a few startups and companies as a freelance frontend developer and product designer.
                </p>
            </div>

            <div>
                <h1 className="leading-relaxed mb-6">UI Explorations</h1>
                <div className="space-y-4">
                    <ProjectCard title="Apple iPhone 15 marketing bottom bar" description="An attempt at recreating the more button on the Apple iPhone 15 marketing page." link="/playground" />
                </div>
            </div>
        </div>
    )
}

const ProjectCard = (props: {
    title: string
    description: string
    link: string
}) => {
    return(
            <Link href={props.link}>
            <p className="text-[#202020] font-medium leading-relaxed">
                {props.title}
            </p>
            <p>
                {props.description}
            </p>
            </Link>
    )
}