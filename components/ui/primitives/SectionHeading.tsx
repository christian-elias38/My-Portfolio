import { cn } from "@/lib/utils";

const titleSizes = {
  lg: "text-section-title",
  md: "text-3xl md:text-4xl font-bold",
  sm: "text-2xl font-semibold",
};

interface SectionHeadingProps {
  title: React.ReactNode;
  eyebrow?: string;
  description?: React.ReactNode;
  size?: keyof typeof titleSizes;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  size = "lg",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {eyebrow && <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3">{eyebrow}</p>}
      <h2 className={cn(titleSizes[size], "text-foreground", description && "mb-3")}>{title}</h2>
      {description && (
        <p className={cn("text-muted-foreground max-w-md", align === "center" && "mx-auto")}>{description}</p>
      )}
    </div>
  );
}
