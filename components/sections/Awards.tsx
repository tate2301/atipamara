const awards = [
  {
    year: "2022",
    title: "Bronze — UmojaHack Africa 2022",
    href: "https://zindi.africa",
    desc: "Built a loan default prediction model on Zimnat data. Intermediate track.",
  },
  {
    year: "2021",
    title: "9th of 150 — UmojaHack Africa 2021",
    href: "https://zindi.africa",
    desc: "Sendy Rider Challenge. Competed against university teams across Africa.",
  },
  {
    year: "2020",
    title: "1st Place — POTRAZ Hack4SmartCities",
    href: "https://potraz.gov.zw",
    desc: "Built a rapid-response safety app using ambient sound and phone sensors. Prize: ZWL$1,000,000 (~USD$37,000 at time of award).",
  },
];

export default function Awards() {
  return (
    <section className="section">
      <span className="label">Awards</span>
      {awards.map((a) => (
        <a
          key={a.title}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className="award-row"
        >
          <div className="award-year">{a.year}</div>
          <div>
            <div className="award-title">{a.title}</div>
            <div className="award-desc">{a.desc}</div>
          </div>
        </a>
      ))}
    </section>
  );
}
