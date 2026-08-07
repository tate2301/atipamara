export type Note = {
  slug: string;
  title: string;
  date: string;
  kind: "interactive" | "written";
  line: string;
};

export const notes: Note[] = [
  {
    slug: "the-day-localhost-lied",
    title: "The day localhost lied",
    date: "Oct 2025",
    kind: "written",
    line: "A debugging story with a one-line ending.",
  },
  {
    slug: "the-dock-is-a-bell-curve",
    title: "The dock is a bell curve",
    date: "Oct 2025",
    kind: "interactive",
    line: "Rebuilding the magnification everyone knows and nobody understands.",
  },
  {
    slug: "the-island-that-breathes",
    title: "The island that breathes",
    date: "Sep 2025",
    kind: "interactive",
    line: "One div, one radius, and the spring that sells the illusion.",
  },
  {
    slug: "springs-not-durations",
    title: "Springs, not durations",
    date: "Aug 2025",
    kind: "interactive",
    line: "The three numbers behind every animation on this site.",
  },
  {
    slug: "why-your-gradients-turn-grey",
    title: "Why your gradients turn grey",
    date: "May 2025",
    kind: "interactive",
    line: "What sRGB does to color, and how perceptual space undoes it.",
  },
  {
    slug: "a-word-that-breathes",
    title: "A word that breathes",
    date: "Mar 2025",
    kind: "interactive",
    line: "One font file, every weight, and an easing curve that inhales.",
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
