import ProjectRow from "@/components/projects/ProjectRow";

const projects = [
  {
    name: "Huchu",
    tagline: "Patient management platform for clinics in Zimbabwe",
    description:
      "A clinical health-record platform for private practitioners and small clinics across Zimbabwe. Handles digital patient records, appointment scheduling, and billing — replacing paper-based systems. Built while embedded with the CUT Health Innovation team.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    badge: "production" as const,
    image: "/images/huchu.png",
  },
  {
    name: "Afrisight",
    // AFRISIGHT_QUOTE — uncomment and fill when quote arrives:
    // quote: {
    //   text: "",
    //   author: "",
    //   role: "",
    // },
    tagline: "Audience research platform for African markets",
    description:
      "Market research infrastructure for African brands. Panels, surveys, and audience targeting across Zimbabwe, Kenya, and South Africa. Helped clients collect over 40,000 survey responses in the first quarter of launch.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    badge: "production" as const,
    image: "/images/afrisight.png",
  },
  {
    name: "PaaS",
    tagline: "Internal deployment platform for student startups",
    description:
      "A developer platform built for student startup teams at the Innovation Hub. A single dashboard to provision databases, deploy containers, and manage environment variables — reducing 'works on my machine' incidents by giving teams identical staging environments.",
    tags: ["TypeScript", "Docker", "Next.js"],
    badge: "production" as const,
    image: "/images/paas.png",
  },
  {
    name: "Snackbar",
    tagline: "Keyboard-first task manager for developers",
    description:
      "A supercharged task manager designed around keyboard-first workflows. Tasks, notes, and deadlines live in a single minimal interface. Built as an Electron desktop app with SQLite for local-first data storage.",
    tags: ["React", "Electron", "SQLite"],
    badge: "open" as const,
    href: "https://snackbar.atipamara.xyz",
  },
];

export default function Projects() {
  return (
    <section className="section">
      <span className="label">Projects</span>
      {projects.map((p) => (
        <ProjectRow
          key={p.name}
          name={p.name}
          tagline={p.tagline}
          description={p.description}
          tags={p.tags}
          badge={p.badge}
          href={"href" in p ? p.href : undefined}
          image={"image" in p ? p.image : undefined}
        />
      ))}
    </section>
  );
}
