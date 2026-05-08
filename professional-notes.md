# Tatenda — Professional Notes

This file is the source-of-truth brain-dump used to keep the website and Upwork profile in sync. Update it whenever new work lands.

## Roles & Projects

### Afrisight (full-time, until March 2025)
- Built the **mobile app** for running surveys.
- Built the **dashboard** that operators use to run those surveys.

### CXAnalytics (sister brand of Afrisight)
- Did the **branding** for CXAnalytics.
- **Designed and built the platform** — a consumer-analytics product for brands.

### Query Builder for Power Users (contract, post-Afrisight, under CXAnalytics)
- No-code analytics platform on top of the raw MongoDB data CXAnalytics stores for clients.
- Mental model: Stripe Sigma, but for CX data.
- Focus areas: building complex aggregation pipelines, previewing them, collaboration, publishing.

### Corelith ERP
- Most up-to-date landing page: https://yco6cxisz2ejq.kimi.page/
- Full ERP build.
- While developing the **CCTV integration module**, spun out a separate project (below).

### mediamtx-rtsp-forwarder
- Born out of the Corelith CCTV integration work.
- Runs on on-prem **edge boxes** that integrate with **Hikvision NVRs**.
- Forwards CCTV video streams to the web so they can be viewed inside the ERP.

### PaaS Platform
- Noteworthy personal/side project. (Details TBD — ask Tatenda for scope, status, and what's public.)

## Current Website State (audit 2026-05-08)

### Header / positioning
- Page title: "Tatenda Chinyamakobvu — Design Engineer"
- Tagline: "Full-stack engineer. I care about the parts most engineers skip."
- Bio mentions: "Three companies currently run software I built from scratch, through Corelith."
- Stats: 3 companies in production / 6+ years / 10★ open source / ZW
- Email: hi@chris.pagka.dev · GitHub: tate2301 · X: atipamara
- Note: header text says "Full-stack engineer" but `<title>` tag still says "Design Engineer" — pick one.

### Projects section already lists
1. Corelith — multi-tenant ERP, 3 production clients (grocery, scrap metal, mining). Linked to github.com/tate2301/huchu. Has image.
2. CXanalytics (by Afrisight) — brand + dashboard + no-code MongoDB query builder + targeting algorithms. Production · Enterprise. (Note: query builder is currently described as a "spike inside CXanalytics" — needs decision on whether to separate.)
3. Afrisight Mobile — React Native panel app. Production · Afrisight. **TODO: screenshot missing** (`/images/afrisight-mobile.png`).
4. PaaS Platform — self-hosted Heroku alternative. Open source. Linked.
5. paynow-react — React SDK for Paynow. Open source · 10★. Linked.

### Experience section already lists
- 2023–now Corelith (Founder)
- 2023–now Afrisight — **needs to change to 2023–Mar 2025 + contract through 2025**
- 2023–now CUT Innovation Hub (Design Engineer)
- 2022–2023 TreatDAO (Senior Product Engineer)
- 2021 22Seven, 2021 Techzim

### Writing
- `/writing` page renders "Under Development" placeholder.
- One real MDX post exists: `posts/fixing-wsl-localhost-issues.mdx`. Not currently surfaced.

## Gaps / Updates Needed
1. **mediamtx-rtsp-forwarder** — not listed anywhere. Needs new project entry.
2. **Afrisight end date** — site shows 2023–now; should reflect leaving in March 2025 and the post-employment CXAnalytics contract for the query builder.
3. **Query Builder positioning** — currently bundled inside CXanalytics card. Decide: separate project entry vs keep bundled.
4. **Corelith landing link** — site links `corelith.com`; the most current landing is `https://yco6cxisz2ejq.kimi.page/`. Decide which to point to.
5. **Title alignment** — `<title>`/metadata says "Design Engineer", header says "Full-stack engineer". Pick one.
6. **Stats refresh** — "6+ years" can probably tick up; 10★ may be stale.
7. **Writing page** — wire up the existing MDX post instead of "Under Development".
8. **Afrisight Mobile screenshot** missing.

## Open Questions for Tatenda
- Public vs NDA for each project (Corelith, CXanalytics, Afrisight Mobile, query builder, mediamtx, PaaS — assume all public unless told otherwise).
- mediamtx-rtsp-forwarder: repo URL, public or private, one-line tagline.
- PaaS platform: any updates since the current site copy was written.
- Tech-stack list to feature on site + Upwork.
- Any metrics safe to share (users, scale, revenue).
- Upwork tone preference (technical/builder vs business-outcomes-led).
