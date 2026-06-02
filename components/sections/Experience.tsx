const experiences = [
  {
    year: "2023–now",
    company: "Corelith",
    role: "Founder",
    href: null,
    desc: "Building and running software for clients across Zimbabwe. Three companies in production.",
  },
  {
    year: "2023–now",
    company: "Afrisight",
    role: "Collaborator — Analytics Platform",
    href: "https://afrisight.com",
    desc: "Analytics pipeline tooling for a market research platform used across Africa.",
  },
  {
    year: "2023–now",
    company: "CUT Innovation Hub",
    role: "Design Engineer",
    href: "https://buildwithtif.xyz",
    desc: "Helping student founders design and build user-focused products. Mentored developers at the Build With The Idea Factory cohort.",
  },
  {
    year: "2022–2023",
    company: "TreatDAO",
    role: "Senior Product Engineer",
    href: "https://treatdao.org",
    desc: "Led development of the $TREAT multichain bridge. Built a subgraph indexer for TreatDAO market smart contracts using TheGraph.",
  },
  {
    year: "2021",
    company: "22Seven",
    role: "Contract Frontend Developer",
    href: "https://www.22seven.com",
    desc: "Marketing website. Headless WordPress + Gatsby.",
  },
  {
    year: "2021",
    company: "Techzim",
    role: "Fullstack Developer",
    href: "https://www.techzim.co.zw",
    desc: "Built the buy-on-credit feature. Laid groundwork for Headless WordPress migration.",
  },
];

export default function Experience() {
  return (
    <section className="section">
      <span className="label">Experience</span>
      {experiences.map((e) =>
        e.href ? (
          <a
            key={e.company + e.year}
            href={e.href}
            target="_blank"
            rel="noopener noreferrer"
            className="exp-row"
          >
            <div className="exp-year">{e.year}</div>
            <div className="exp-right">
              <div className="exp-top">
                <span className="exp-company">{e.company}</span>
                <span className="exp-role">{e.role}</span>
              </div>
              <div className="exp-desc">{e.desc}</div>
            </div>
          </a>
        ) : (
          <div key={e.company + e.year} className="exp-row">
            <div className="exp-year">{e.year}</div>
            <div className="exp-right">
              <div className="exp-top">
                <span className="exp-company">{e.company}</span>
                <span className="exp-role">{e.role}</span>
              </div>
              <div className="exp-desc">{e.desc}</div>
            </div>
          </div>
        ),
      )}
    </section>
  );
}
