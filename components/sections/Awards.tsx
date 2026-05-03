const awards = [
  {
    year: "2020",
    title: "1st Place",
    event: "POTRAZ Hack4SmartCities Challenge",
    href: "https://potraz.gov.zw",
    desc: "Built a rapid-response safety app using ambient sound processing and phone sensors to detect danger. Won ZWL$1,000,000 — valued at USD $37,000 at the time.",
  },
  {
    year: "2021",
    title: "9th Place / 150 teams",
    event: "UmojaHack Africa — Sendy Challenge",
    href: "https://zindi.africa/competitions/umojahack-africa-2021-2-sendy-challenge-intermediate/leaderboard",
    desc: "Ranked 9th in the Sendy Rider Challenge out of 150 teams from universities across the continent.",
  },
  {
    year: "2022",
    title: "Bronze",
    event: "UmojaHack Africa",
    href: "https://zindi.africa/competitions/umojahack-zimbabwe",
    desc: "Won bronze in the intermediate ML challenge. Built a loan default prediction model using a Zimnat dataset.",
  },
];

export default function Awards() {
  return (
    <section className="section">
      <span className="label">Awards</span>
      {awards.map((a) => (
        <a
          key={a.title + a.year}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className="award-row"
        >
          <div className="award-year">{a.year}</div>
          <div>
            <div className="award-title">{a.title}</div>
            <div className="award-desc">
              {a.event} — {a.desc}
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
