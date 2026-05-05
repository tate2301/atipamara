"use client";
import { useState } from "react";
import Image from "next/image";
import Tag from "@/components/ui/Tag";

type ProjectRowProps = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  badge?: "production" | "open";
  badgeLabel?: string;
  href?: string;
  image?: string;
  codeSnippet?: string;
};

export default function ProjectRow({
  name,
  tagline,
  description,
  tags,
  badge,
  badgeLabel,
  href,
  image,
  codeSnippet,
}: ProjectRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`project-row${open ? " open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="project-head">
        <div className="project-left">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-name project-name-link"
            >
              {name}
            </a>
          ) : (
            <span className="project-name">{name}</span>
          )}
          <span className="project-dash">—</span>
          <span className="project-desc">{tagline}</span>
        </div>
        <div className="project-right">
          {badge && (
            <Tag
              label={badgeLabel ?? badge}
              variant={badge === "production" ? "production" : "open"}
            />
          )}
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
      <div className="project-reveal">
        <div className="reveal-inner">
          <p className="reveal-body">{description}</p>
          <div className="reveal-img">
            {image ? (
              <Image src={image} alt={name} width={240} height={150} />
            ) : codeSnippet ? (
              <pre
                className="reveal-code"
                style={{ height: "100%", margin: 0, borderRadius: 0, border: "none", fontSize: "10.5px" }}
              >
                {codeSnippet}
              </pre>
            ) : (
              <div className="reveal-placeholder">
                {name.toLowerCase()}
                <br />
                screenshot coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
