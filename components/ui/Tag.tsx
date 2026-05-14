type TagVariant = "default" | "production" | "open";

type TagProps = {
  label?: string;
  variant?: TagVariant;
};

const DEFAULT_LABELS: Record<TagVariant, string> = {
  default: "",
  production: "Production",
  open: "Open source",
};

export default function Tag({ label, variant = "default" }: TagProps) {
  const cls =
    variant === "production"
      ? "tag-production"
      : variant === "open"
        ? "tag-open"
        : "tag";
  const text = label ?? DEFAULT_LABELS[variant];
  return <span className={cls}>{text}</span>;
}
