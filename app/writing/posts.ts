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
