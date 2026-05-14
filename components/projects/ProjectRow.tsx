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
  meta?: string;
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
  meta,
  href,
  image,
  illustration,
  codeSnippet,
}: ProjectRowProps) {
  const Illustration =
    illustration === "paas"
      ? PaasIllustration
      : illustration === "paynow"
        ? PaynowIllustration
        : null;

  return (
    <div className="project-row">
      <div className="project-head">
        {badge && (
          <Tag variant={badge === "production" ? "production" : "open"} />
        )}
        <span className="project-name">{name}</span>
        <span className="project-desc">{tagline}</span>
        {meta && <span className="project-meta">{meta}</span>}
        {href && (
          <a
            className="project-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${name}`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 10l6-6M5 4h5v5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>

      <div className="project-reveal">
        <div className="project-reveal-inner">
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
    </div>
  );
}
