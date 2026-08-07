import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { notes, getNote } from "@/app/notes/notes";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote(params.slug);
  if (!note) return {};
  return {
    title: `${note.title} — Tatenda Chinyamakobvu`,
    description: note.line,
  };
}

async function loadMdx(slug: string): Promise<ComponentType | null> {
  try {
    switch (slug) {
      case "the-island-that-breathes": {
        const m = await import("@/content/notes/the-island-that-breathes.mdx");
        return m.default;
      }
      case "the-dock-is-a-bell-curve": {
        const m = await import("@/content/notes/the-dock-is-a-bell-curve.mdx");
        return m.default;
      }
      case "springs-not-durations": {
        const m = await import("@/content/notes/springs-not-durations.mdx");
        return m.default;
      }
      case "why-your-gradients-turn-grey": {
        const m = await import(
          "@/content/notes/why-your-gradients-turn-grey.mdx"
        );
        return m.default;
      }
      case "a-word-that-breathes": {
        const m = await import("@/content/notes/a-word-that-breathes.mdx");
        return m.default;
      }
      case "the-day-localhost-lied": {
        const m = await import("@/content/notes/the-day-localhost-lied.mdx");
        return m.default;
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

export default async function NoteRoute({ params }: Props) {
  const note = getNote(params.slug);
  const Content = await loadMdx(params.slug);

  if (!note || !Content) {
    return (
      <main className="memoir">
        <p className="note-missing">
          This note doesn&apos;t exist. <Link href="/">Go back.</Link>
        </p>
      </main>
    );
  }

  const index = notes.findIndex((n) => n.slug === note.slug);
  const next = notes[index + 1] ?? notes[0];

  return (
    <main className="memoir">
      <div className="memoir-toggle">
        <ThemeToggle />
      </div>
      <nav className="note-back">
        <Link href="/">← Tatenda Chinyamakobvu</Link>
      </nav>
      <header className="note-head">
        <p className="note-meta">
          {note.date} · {note.kind === "interactive" ? "an interactive note" : "a written note"}
        </p>
        <h1 className="note-title">{note.title}</h1>
      </header>
      <article className="note-body">
        <Content />
      </article>
      {next && next.slug !== note.slug && (
        <footer className="note-foot">
          <Link href={`/notes/${next.slug}`}>
            Next — {next.title}
          </Link>
        </footer>
      )}
    </main>
  );
}
