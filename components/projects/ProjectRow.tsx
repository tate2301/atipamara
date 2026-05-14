"use client";
import { useState } from "react";
import Image from "next/image";
import {
  PaasIllustration,
  PaynowIllustration,
} from "@/components/illustrations/ProjectIllustrations";
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
  illustration?: "paas" | "paynow";
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
  illustration,
  codeSnippet,
}: ProjectRowProps) {
  const [open, setOpen] = useState(false);
  const Illustration =
    illustration === "paas"
      ? PaasIllustration
      : illustration === "paynow"
        ? PaynowIllustration
        : null;

  return (
    <div
      className={`project-row${open ? " open" : ""}`}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="project-head">
        {badge && (
          <Tag
            label={badgeLabel ?? badge}
            variant={badge === "production" ? "production" : "open"}
          />
        )}
        <div className="project-body">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-name project-name-link"
              onClick={(e) => e.stopPropagation()}
            >
              {name}
            </a>
          ) : (
            <span className="project-name">{name}</span>
          )}
          <span className="project-desc">{tagline}</span>
        </div>
        <span
          className={`project-chevron${open ? " open" : ""}`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="project-reveal">
        <div className="reveal-inner">
          {Illustration ? (
            <div className="reveal-media reveal-media-illustration">
              <Illustration />
            </div>
          ) : image ? (
            <div className="reveal-media">
              <Image
                src={image}
                alt={`${name} screenshot`}
                fill
                quality={95}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 720px"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          ) : null}
          {!Illustration && !image && codeSnippet && (
            <div className="reveal-code-block">
              <pre>{codeSnippet}</pre>
            </div>
          )}
          <p className="reveal-body">{description}</p>
          <div className="reveal-tags">
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
