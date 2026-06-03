export type Post = {
  slug: string;
  title: string;
  date: string;
  year: string;
  topic: string;
  readTime: string;
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "ecocash-twitter-hack",
    title: "EcoCash's Twitter Got Hacked. The Real Story Is Worse Than the Tweets.",
    date: "Jun 3",
    year: "2026",
    topic: "Security",
    readTime: "3 min",
    excerpt:
      "Someone hacked EcoCash's official Twitter account to protest a $35 dispute. The breach is fixable. The trust failure is not.",
  },
  {
    slug: "fixing-wsl-localhost-issues",
    title: "Fixing WSL localhost & port forwarding issues",
    date: "Oct 22",
    year: "2025",
    topic: "Debugging",
    readTime: "1 min",
    excerpt:
      "The smallest fix for the most annoying WSL2 networking bug — disable Fast Startup.",
  },
];
