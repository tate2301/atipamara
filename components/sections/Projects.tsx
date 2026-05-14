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
      "Three businesses run on it: a grocery retailer, a scrap metal recycler, and a mining operation. Each gets its own subdomain, branded workspace, and industry-specific module set — the retail tenant runs POS, stock management, and purchasing; the scrap tenant tracks weight in/out, inbound tickets, and supplier settlements by kg. One shared core for HR, payroll, financial reporting, banking, and receivables across all three.\n\nOffline-first via service worker sync — 'Preparing offline workspace' loads before the dashboard does. Subdomain multitenancy with strict tenant isolation, RBAC with 2FA, append-only audit log. Built for Zimbabwe where the internet is negotiable.",
    tags: ["Next.js 15", "PostgreSQL", "Prisma", "PWA", "Docker"],
    badge: "production" as const,
    meta: "120+ users",
    href: "https://github.com/tate2301/huchu",
    image: "/images/corelith.png",
  },
  {
    name: "CXanalytics",
    // AFRISIGHT_QUOTE — insert once received
    // Format:
    // "[Quote about business impact, not working relationship]"
    // — [First name], [Role], Afrisight
    tagline: "Customer experience analytics — by Afrisight",
    description:
      "CXanalytics is Afrisight's enterprise customer-experience analytics product. I designed the brand from scratch, built the dashboard from a blank canvas, and wrote the targeting algorithms that decide which survey reaches which respondent.\n\nThe surface that turns raw panel responses into something a brand team can actually act on. Querying, segmentation, and reporting — all on top of the data flowing in from the Afrisight mobile app.",
    tags: ["TypeScript", "Next.js", "MongoDB", "React", "Brand Identity"],
    badge: "production" as const,
    meta: "Enterprise",
    image: "/images/afrisight.png",
  },
  {
    name: "CXanalytics Query Builder",
    tagline: "Stripe-Sigma-style no-code analytics on MongoDB",
    description:
      "Contract build for CXAnalytics after I wrapped up full-time at Afrisight. Lets enterprise CX teams write complex aggregation pipelines on raw MongoDB survey data without an engineer in the loop.\n\nNested logical filters, profile joins, live schema inference, pipeline preview, team collaboration, and publishing — so a finished query becomes a reusable report operators can run on demand. Stripe Sigma, applied to survey responses.",
    tags: ["TypeScript", "Next.js", "MongoDB Aggregation", "Schema Inference"],
    badge: "production" as const,
    meta: "Contract",
  },
  {
    name: "Afrisight Mobile",
    tagline: "Consumer app for a pan-African market research panel",
    description:
      "The panel-side surface for Afrisight — where respondents across Africa take surveys and earn rewards. The product side of CXanalytics: where the data starts before it lands in an enterprise dashboard.\n\nReact Native, mobile-first, built for emerging-market connectivity — surveys don't lose progress when a tower drops. Older Android devices, smaller screens, real money in payouts, real trust to earn. Shipped, in production, used daily.",
    tags: ["React Native", "TypeScript", "Mobile", "Offline-first"],
    badge: "production" as const,
    meta: "Afrisight",
    // TODO: add screenshot at /images/afrisight-mobile.png
  },
  {
    name: "mediamtx-rtsp-forwarder",
    tagline: "Edge-box bridge from on-prem CCTV to the browser",
    description:
      "Born inside the Corelith CCTV integration module. Runs on small on-prem edge boxes alongside Hikvision NVRs, picks up the RTSP feeds, and forwards them to the web so a camera grid renders inside the ERP — without exposing the customer's NVR to the public internet.\n\nMakes the 'view your shop floor from the dashboard' feature work for clients running cameras behind a NAT'd internet connection — a very real Zimbabwean constraint.",
    tags: ["RTSP", "WebRTC", "MediaMTX", "Hikvision", "On-prem"],
    badge: "production" as const,
    meta: "Edge / OSS",
    href: "https://github.com/tate2301/mediamtx-rtsp-forwarder",
  },
  {
    name: "PaaS Platform",
    tagline: "Self-hosted Heroku alternative",
    description:
      "GitHub push-to-deploy, automatic preview environments for every pull request, managed database provisioning (PostgreSQL, MySQL, MongoDB, Redis, MinIO), and a full Prometheus + Loki + Grafana observability stack.\n\nBuilt to understand every layer of deployment infrastructure. The best way to learn a system is to build it yourself.",
    tags: ["Next.js", "Node.js", "Docker", "BullMQ", "Traefik"],
    badge: "open" as const,
    meta: "Side project",
    href: "https://github.com/tate2301/paas-platform",
    illustration: "paas" as const,
  },
  {
    name: "paynow-react",
    tagline: "React SDK for Zimbabwe's leading payment gateway",
    description:
      "The standard React integration for Paynow, Zimbabwe's dominant payment gateway. Web checkout, EcoCash, OneMoney, polling. Full TypeScript support.\n\nUsed in production fintech applications. Organically adopted — no promotion, just useful.",
    tags: ["TypeScript", "React", "Paynow API"],
    badge: "open" as const,
    meta: "10★",
    href: "https://github.com/tate2301/paynow-react",
    illustration: "paynow" as const,
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
          meta={p.meta}
          href={"href" in p ? p.href : undefined}
          image={"image" in p ? p.image : undefined}
          illustration={"illustration" in p ? p.illustration : undefined}
          codeSnippet={"codeSnippet" in p ? p.codeSnippet : undefined}
        />
      ))}
    </section>
  );
}
