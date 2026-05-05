type TagVariant = "default" | "production" | "open";

type TagProps = {
  label: string;
  variant?: TagVariant;
};

export default function Tag({ label, variant = "default" }: TagProps) {
  const cls =
    variant === "production"
      ? "tag-production"
      : variant === "open"
        ? "tag-open"
        : "tag";
  return <span className={cls}>{label}</span>;
}
