# Website Update — CXanalytics + Afrisight Mobile

The site at chris.pagka.dev currently has a single Afrisight project ("Afrisight Analytics Engine"). The user wants this restructured so:

1. The existing Afrisight project becomes **CXanalytics** (its actual product name) — and gets richer framing for the branding, dashboard, query builder, and targeting algorithms.
2. **Afrisight Mobile App** is added as a separate, second project.

Below are drop-in replacement project entries that match the existing data shape (looked at from the rendered page source — your projects are passed as props with `name`, `tagline`, `description`, `tags`, `badge`, `badgeLabel`, `href`, `image`, etc.).

---

## How to integrate

Open your projects array (likely in `app/page.tsx`, `data/projects.ts`, or similar — wherever you currently define `Corelith`, `Afrisight Analytics Engine`, `PaaS Platform`, `paynow-react`).

**1.** Replace the existing `Afrisight Analytics Engine` entry with the **CXanalytics** entry below.
**2.** Insert the **Afrisight Mobile App** entry right after CXanalytics (before PaaS Platform).
**3.** Drop a new image at `public/images/cxanalytics.png` (rename your existing afrisight.png if it shows the dashboard) and add an `afrisight-mobile.png` for the mobile shot.

---

## Drop-in entry: CXanalytics (replaces Afrisight Analytics Engine)

```ts
{
  name: "CXanalytics",
  tagline: "Enterprise customer experience analytics — by Afrisight",
  description: `CXanalytics is Afrisight's enterprise CX analytics product. I designed the brand, built the dashboard from a blank canvas, and wrote the targeting algorithms that pick which survey reaches which respondent.

The query builder is the spike — a no-code interface for MongoDB aggregation pipelines so enterprise CX teams can slice survey data without writing aggregations or asking an engineer. Nested logical filters, profile joins, live schema inference, results table with search, sort, pagination, and CSV export. Think Stripe Sigma, applied to survey responses.`,
  tags: ["TypeScript", "Next.js", "MongoDB", "React", "Brand Identity"],
  badge: "production",
  badgeLabel: "Production · Enterprise",
  // href omitted intentionally — enterprise product, no public link
  image: "/images/cxanalytics.png", // or keep /images/afrisight.png if it shows the dashboard
}
```

---

## Drop-in entry: Afrisight Mobile App (new)

```ts
{
  name: "Afrisight Mobile",
  tagline: "Consumer mobile app for a pan-African market research panel",
  description: `The panel-side surface for Afrisight — where respondents across Africa take surveys and earn rewards. The product side of CXanalytics: where the data starts before it lands in an enterprise dashboard.

Built React Native, mobile-first, for emerging-market connectivity — surveys don't lose progress when a tower drops. Older Android devices, smaller screens, real money in payouts, real trust to earn. Shipped, in production, used daily.`,
  tags: ["React Native", "TypeScript", "Mobile", "Offline-first"],
  badge: "production",
  badgeLabel: "Production · Afrisight",
  // href omitted — link to App Store / Play Store if you'd like:
  // href: "https://play.google.com/store/apps/details?id=...",
  image: "/images/afrisight-mobile.png",
}
```

---

## If your project component is co-located inline (page.tsx)

If you're declaring projects directly in JSX (not via a data array), here's the JSX shape to drop in. Pattern from your current page:

```tsx
<ProjectRow
  name="CXanalytics"
  tagline="Enterprise customer experience analytics — by Afrisight"
  description={`CXanalytics is Afrisight's enterprise CX analytics product. I designed the brand, built the dashboard from a blank canvas, and wrote the targeting algorithms that pick which survey reaches which respondent.

The query builder is the spike — a no-code interface for MongoDB aggregation pipelines so enterprise CX teams can slice survey data without writing aggregations or asking an engineer. Nested logical filters, profile joins, live schema inference, results table with search, sort, pagination, and CSV export. Think Stripe Sigma, applied to survey responses.`}
  tags={["TypeScript", "Next.js", "MongoDB", "React", "Brand Identity"]}
  badge="production"
  badgeLabel="Production · Enterprise"
  image="/images/cxanalytics.png"
/>

<ProjectRow
  name="Afrisight Mobile"
  tagline="Consumer mobile app for a pan-African market research panel"
  description={`The panel-side surface for Afrisight — where respondents across Africa take surveys and earn rewards. The product side of CXanalytics: where the data starts before it lands in an enterprise dashboard.

Built React Native, mobile-first, for emerging-market connectivity — surveys don't lose progress when a tower drops. Older Android devices, smaller screens, real money in payouts, real trust to earn. Shipped, in production, used daily.`}
  tags={["React Native", "TypeScript", "Mobile", "Offline-first"]}
  badge="production"
  badgeLabel="Production · Afrisight"
  image="/images/afrisight-mobile.png"
/>
```

(Component name is a guess — adjust to your actual one. Looked like `$L5` in the compiled output, which is just the bundler ID.)

---

## Bio update (optional, but recommended)

Your current site bio mentions Afrisight only obliquely. Suggested expansion to your `<div class="bio">` block — replace the second paragraph with:

```jsx
<p>
  For <a href="https://afrisight.com" target="_blank" rel="noopener noreferrer">Afrisight</a>,
  I built CXanalytics — the brand, the dashboard, and the survey targeting engine — and shipped
  their consumer mobile app, used by survey panelists across Africa.
</p>
<p>
  I grew up in Zimbabwe writing code for fun. Fifteen years later I'm still doing the same thing —
  just now people pay me for it, and the stakes are a bit higher.
</p>
```

This positions the Afrisight work prominently before the visitor scrolls to the project list.

---

## Experience row update (recommended)

Update your existing Afrisight experience row from:

> Collaborator — Analytics Platform
> Analytics pipeline tooling for a market research platform used across Africa.

To:

> Lead Engineer & Brand — CXanalytics + Mobile
> Built the enterprise CX analytics product (brand, dashboard, MongoDB query builder, survey targeting) and shipped the consumer panel mobile app.

---

## Files to update (best guess)

- `app/page.tsx` — main projects list and bio
- `public/images/cxanalytics.png` — new image (or rename afrisight.png)
- `public/images/afrisight-mobile.png` — new mobile screenshot
- Any `data/projects.ts` if you've extracted the project data

If your repo lives somewhere I can reach (GitHub, local folder), share it next session and I'll open the PR directly.
