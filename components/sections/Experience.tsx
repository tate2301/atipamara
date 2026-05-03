const experiences = [
  {
    year: "2023–now",
    company: "CUT Innovation Hub",
    role: "Design Engineer",
    href: "https://buildwithtif.xyz",
    desc: "Helping student founders design and ship user-focused products. Mentored developers at the Build With The Idea Factory cohort of 2023.",
  },
  {
    year: "2022–2023",
    company: "TreatDAO",
    role: "Senior Product Engineer",
    href: "https://treatdao.org",
    desc: "Designed and led the team building the $TREAT multichain bridge. Built a TheGraph indexer for TreatDAO market smart contracts.",
  },
  {
    year: "2022",
    company: "TreatDAO",
    role: "Fullstack Web3 Developer",
    href: "https://treatdao.org",
    desc: "Developed the TreatDAO NFT marketplace on the Binance Smart Chain. Worked directly with EVM smart contracts for on-chain marketplace logic.",
  },
  {
    year: "2021",
    company: "22Seven",
    role: "Contract Frontend Developer",
    href: "https://www.22seven.com",
    desc: "Contracted to develop the marketing website powered by Headless WordPress and Gatsby.",
  },
  {
    year: "2021",
    company: "Techzim",
    role: "Fullstack Developer",
    href: "https://www.techzim.co.zw",
    desc: "Built the buy-on-credit feature for the Techzim marketplace and laid the groundwork for a Headless WordPress migration.",
  },
  {
    year: "2019–2020",
    company: "Tachom",
    role: "Product Designer",
    href: "https://www.devtachom.com",
    desc: "Designed mobile apps and SaaS products for Tachom clients including Vaai, Afrispark, and ThothAI.",
  },
];

export default function Experience() {
  return (
    <section className="section">
      <span className="label">Experience</span>
      {experiences.map((e) => (
        <a
          key={e.company + e.year}
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          className="exp-row"
        >
          <div className="exp-year">{e.year}</div>
          <div>
            <span className="exp-company">{e.company}</span>
            <span className="exp-role">{e.role}</span>
            <div className="exp-desc">{e.desc}</div>
          </div>
        </a>
      ))}
    </section>
  );
}
