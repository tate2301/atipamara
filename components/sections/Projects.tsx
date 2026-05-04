import ProjectRow from "@/components/projects/ProjectRow";

const PAYNOW_SNIPPET = `import { usePaynow } from 'paynow-react'

const { initiatePayment } = usePaynow({
  integrationId: process.env.PAYNOW_ID,
  integrationKey: process.env.PAYNOW_KEY,
  returnUrl: 'https://yourapp.com/return',
})

await initiatePayment({
  reference: 'order-123',
  amount: 25.00,
  email: 'customer@email.com',
})`;

const projects = [
  {
    name: "Corelith",
    tagline: "Multi-tenant business platform for Zimbabwe",
    description:
      "Three different businesses run on it — a mining operation, a grocery retailer, a distribution company. Each gets its own subdomain, its own data, modules configured for their industry. One platform covering 15 industries: stock, sales, HR, payroll, CCTV, equipment maintenance, ZIMRA compliance.\n\nBuilt around Zimbabwe's reality. Service worker sync means every action stores on-device and commits when the internet returns. Subdomain multitenancy with strict tenant isolation, RBAC with 2FA, append-only audit log. It has to work when the internet doesn't.",
    tags: ["Next.js 15", "PostgreSQL", "Prisma", "PWA", "Docker"],
    badge: "production" as const,
    badgeLabel: "Production · 3 clients",
    href: "https://github.com/tate2301/huchu",
    image: "/images/huchu.png",
  },
  {
    name: "Afrisight Analytics Engine",
    // AFRISIGHT_QUOTE — insert once received
    // Format:
    // "[Quote about business impact, not working relationship]"
    // — [First name], [Role], Afrisight
    tagline: "Pipeline builder for a market research platform",
    description:
      "Built for Afrisight, a market research platform operating across Africa. Consumer brands and sales teams use it to find patterns in survey data and make better decisions.\n\nNo-code interface for MongoDB aggregation pipelines — nested logical filters, profile joins, live schema inference, and a results table with search, sort, pagination, and CSV export. My data science background meant I knew what the analysts actually needed.",
    tags: ["TypeScript", "MongoDB", "Next.js", "React"],
    badge: "production" as const,
    badgeLabel: "Production · Afrisight",
    image: "/images/afrisight.png",
  },
  {
    name: "PaaS Platform",
    tagline: "Self-hosted Heroku alternative",
    description:
      "GitHub push-to-deploy, automatic preview environments for every pull request, managed database provisioning (PostgreSQL, MySQL, MongoDB, Redis, MinIO), and a full Prometheus + Loki + Grafana observability stack.\n\nBuilt to understand every layer of deployment infrastructure. The best way to learn a system is to build it yourself.",
    tags: ["Next.js", "Node.js", "Docker", "BullMQ", "Traefik"],
    badge: "open" as const,
    badgeLabel: "Open source",
    href: "https://github.com/tate2301/paas-platform",
    image: "/images/paas.png",
  },
  {
    name: "paynow-react",
    tagline: "React SDK for Zimbabwe's leading payment gateway",
    description:
      "The standard React integration for Paynow, Zimbabwe's dominant payment gateway. Web checkout, EcoCash, OneMoney, polling. Full TypeScript support.\n\nUsed in production fintech applications. Organically adopted — no promotion, just useful.",
    tags: ["TypeScript", "React", "Paynow API"],
    badge: "open" as const,
    badgeLabel: "Open source · 10★",
    href: "https://github.com/tate2301/paynow-react",
    codeSnippet: PAYNOW_SNIPPET,
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
          badgeLabel={p.badgeLabel}
          href={"href" in p ? p.href : undefined}
          image={"image" in p ? p.image : undefined}
          codeSnippet={"codeSnippet" in p ? p.codeSnippet : undefined}
        />
      ))}
    </section>
  );
}
