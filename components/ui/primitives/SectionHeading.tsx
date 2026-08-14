import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {eyebrow && <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3">{eyebrow}</p>}
      <h2 className="text-section-title text-foreground">{title}</h2>
    </div>
  );
}
