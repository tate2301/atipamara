# Contra Profile — Paste-Ready Copy

Voice-matched to chris.pagka.dev: dry, terse, modest, specific. No hype words, no jargon-as-drama. When you're back, paste section-by-section into Contra's profile editor.

---

## Headline (your role / one-liner)

> Full-stack engineer · I build the product founders ship and the dashboard their team actually uses

**Alt 1:** Full-stack engineer for startups — mobile, dashboards, the infra underneath
**Alt 2:** Full-stack engineer · I care about the parts most engineers skip

Pick the one that feels right. I'd lead with the first — it does the most work in the fewest words.

---

## Tagline / Subheading

> Six years shipping production software. Three companies run on code I wrote from scratch. Available for greenfield builds, dashboards, and mobile apps.

---

## About / Bio

I'm a full-stack engineer based in Harare, Zimbabwe. Six-plus years writing software — started when it was a hobby, kept doing it once people started paying.

Three companies run on software I built from scratch through [Corelith](https://corelith.com), my product studio. For [Afrisight](https://afrisight.com) — a market research platform operating across Africa — I built and shipped the consumer mobile app survey panelists use daily, designed the brand for their enterprise CX product (CXanalytics), built the analytics dashboard ground-up, and wrote the targeting algorithms that decide which survey reaches which respondent.

I'm fast at zero-to-one. I'm comfortable owning everything from React Native screens to Postgres schemas. I care about the parts most engineers skip — the empty states, the offline cases, the design system that holds up at six screens, the dashboard that makes an analyst's day shorter instead of longer.

If you're a founder shipping something new and want one person who can do most of it, that's the work I take.

---

## Services

Add these as separate service offerings on your profile. Adjust rates yourself.

### 1. Greenfield product builds — web + mobile + backend
Concept → shipped. I'll take a Figma file (or a Notion doc, or a sketch on a napkin) and turn it into a real product running in production. React/Next.js on the web, React Native on mobile, Node + Postgres or Mongo underneath. I do the boring parts too — auth, billing, error states, deploy.

### 2. Internal dashboards & analytics tools
Custom dashboards, admin panels, query builders, reporting tools. I built CXanalytics's no-code MongoDB query builder for Afrisight's enterprise customers — think Stripe Sigma, but for survey data. If your team is exporting CSVs to Excel or asking engineers for one-off SQL, I can replace that with a tool they'll actually use.

### 3. Mobile apps — React Native (and native when it fits)
Cross-platform mobile, built for emerging-market connectivity (read: works when the network doesn't). The Afrisight panel app I shipped runs across Africa on devices and connections you wouldn't develop on. I've also shipped a Kotlin Android app (contact tracing, used during COVID).

---

## Skills / Tags

Paste these into Contra's skills field. Order by what you want to surface most:

TypeScript · React · Next.js · React Native · Node.js · PostgreSQL · MongoDB · Prisma · Tailwind CSS · Docker · MongoDB Aggregation · REST APIs · GraphQL · Webhooks · BullMQ · Redis · Kotlin · Design Systems · Brand Identity · Product Engineering · Full-stack Development · Dashboard Design · Query Builders · No-code / Low-code Tooling · Data Visualization · Multi-tenancy · PWA · Offline-first

---

## Projects (Featured Work)

Contra lets you add projects with a cover image, role, and description. Use these.

---

### Project 1 — CXanalytics
**Subtitle:** Customer experience analytics for enterprise — branding, dashboard, and the targeting engine
**Role:** Lead Product Engineer & Brand Designer
**Client:** Afrisight
**Status:** Production · Enterprise customers

**Short description (for the card):**
Built the dashboard, brand, and survey targeting algorithms for CXanalytics — Afrisight's enterprise customer experience analytics product. Think Stripe Sigma, but for survey data sitting in MongoDB.

**Full case study:**

CXanalytics is Afrisight's enterprise customer experience analytics product. Brands and CX teams use it to turn raw survey responses into the answers that actually move quarterly decisions.

I owned three pieces of it end-to-end:

**The brand.** CXanalytics needed to look like an enterprise product, not a side feature. I designed the visual identity from scratch — logo, color system, typography, the lot — so the product reads as standalone-credible to enterprise buyers.

**The dashboard, ground-up.** Built the analytics surface from a blank canvas: layout, components, data fetching patterns, charting, the empty states, the loading states, the table that doesn't fall over at 100k rows. Designed for a power user who lives in the tool eight hours a day, not a stakeholder who opens it once a quarter.

**The query builder.** The product's spike. Enterprise CX teams want to slice their survey data without writing MongoDB aggregations or asking an engineer. So I built a no-code query builder on top of MongoDB — nested logical filters, profile joins, live schema inference, results table with search, sort, pagination, and CSV export. The reference point I kept in my head: Stripe Sigma. Same idea, applied to survey responses.

**The targeting algorithms.** The other half of the product runs on the panel side: which respondents see which survey, weighted by demographics, behavior, and prior response patterns. I built the targeting engine that picks the right audience automatically, so brands stop hand-defining segments and start running larger studies faster.

The product ships to enterprise customers across Africa.

**Tech:** TypeScript · Next.js · React · MongoDB Aggregation Framework · custom query DSL · D3 / chart libraries · brand identity (Figma)

---

### Project 2 — Afrisight Mobile App
**Subtitle:** Consumer-facing mobile app for the panel side of a pan-African market research platform
**Role:** Mobile Engineer
**Client:** Afrisight
**Status:** Production · Consumer

**Short description (for the card):**
Built the Afrisight panel mobile app — where survey respondents across Africa earn rewards for completing market research. Mobile-first, built to work on the connections people actually have.

**Full case study:**

Developed the Afrisight consumer mobile app — the panel-side surface where respondents across Africa take surveys and earn rewards. The product side of CXanalytics: where the data comes from before it lands in an enterprise dashboard.

The constraints made it interesting:

- **Connectivity isn't optional.** Users are on every kind of network — fibre in Lagos, 3G in rural Zimbabwe, intermittent everywhere. Surveys can't lose progress when a tower drops.
- **Devices are wide.** Older Android phones, low memory, small screens. Performance is a feature, not a polish item.
- **Trust matters.** Money is changing hands (small amounts, but real). Auth, payout flow, and the receipts have to be tight.

Shipped, in production, used daily.

**Tech:** React Native · TypeScript · REST APIs · offline state handling · payment integrations

---

### Project 3 — Corelith
**Subtitle:** Multi-tenant business platform running three companies in production
**Role:** Founder & Product Engineer
**Status:** Production · 3 clients

**Short description:**
The product studio behind my client work. Three companies run their day-to-day operations on Corelith: a grocery retailer, a scrap metal recycler, and a mining operation.

**Full case study:**

Each tenant gets its own subdomain, branded workspace, and an industry-specific module set on top of one shared core. The retail tenant runs POS, stock management, and purchasing. The scrap tenant tracks weight in/out, inbound tickets, and supplier settlements by kg. All three share HR, payroll, financial reporting, banking, and receivables.

Offline-first via service worker sync — built for Zimbabwe, where the internet is negotiable. Subdomain multitenancy with strict tenant isolation, RBAC with 2FA, append-only audit log.

**Tech:** Next.js 15 · PostgreSQL · Prisma · PWA · Docker · multi-tenancy · RBAC

---

### Project 4 — paynow-react (open source · 10★)
**Subtitle:** The standard React integration for Zimbabwe's dominant payment gateway
**Role:** Author & Maintainer
**Status:** Open source

The standard React SDK for Paynow — Zimbabwe's dominant payment gateway. Web checkout, EcoCash, OneMoney, polling. Full TypeScript. Used in production fintech apps. Organically adopted — no promotion, just useful.

**Tech:** TypeScript · React · Paynow API

---

## Work History (Experience)

- **2023 — now · Founder · Corelith** — Building and running software for clients across Zimbabwe. Three companies in production.
- **2023 — now · Lead Engineer & Brand · Afrisight (CXanalytics + Mobile)** — Built the enterprise CX analytics product (brand, dashboard, query builder, targeting algorithms) and shipped the consumer panel mobile app.
- **2023 — now · Design Engineer · CUT Innovation Hub** — Mentoring student founders at the Build With The Idea Factory cohort.
- **2022 — 2023 · Senior Product Engineer · TreatDAO** — Led development of the $TREAT multichain bridge. Built a TheGraph subgraph indexer for TreatDAO's market smart contracts.
- **2021 · Frontend Developer (contract) · 22Seven** — Marketing site, headless WordPress + Gatsby.
- **2021 · Fullstack Developer · Techzim** — Built the buy-on-credit feature; migration to headless WordPress.

---

## Awards (Recognition)

- **2022** — Bronze, UmojaHack Africa (loan default prediction model on Zimnat data)
- **2021** — 9th of 150, UmojaHack Africa (Sendy Rider Challenge)
- **2020** — 1st Place, POTRAZ Hack4SmartCities (~USD $37,000 prize)

---

## Links

- Website: https://chris.pagka.dev
- GitHub: https://github.com/tate2301
- X / Twitter: https://twitter.com/atipamara
- Email: hi@chris.pagka.dev

---

## Quick paste guide for Contra

When you're back in front of Contra:

1. **Profile basics** — Update headline + subheading from the top of this doc.
2. **About** — Paste the bio block.
3. **Services** — Add the three services as separate service cards.
4. **Skills** — Add tags from the skills section.
5. **Projects** — Add the four projects in order; CXanalytics first since it's the strongest enterprise reference.
6. **Work history** — Add roles in reverse-chronological order.
7. **Cover images** — Use your existing CXanalytics, Afrisight mobile, and Corelith screenshots from chris.pagka.dev/images/.

---
