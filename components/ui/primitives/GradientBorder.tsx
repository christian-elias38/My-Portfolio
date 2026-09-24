import { cn } from "@/lib/utils";

export function GradientBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl p-[1px] bg-linear-to-br from-border to-primary/40", className)}>
      <div className="bg-card rounded-3xl h-full w-full">{children}</div>
    </div>
  );
}