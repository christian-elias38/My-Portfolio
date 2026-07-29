import { cn } from "@/lib/utils";

export function BlurCircle({ size = 300, className }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("absolute rounded-full blur-3xl bg-accent/10 pointer-events-none", className)}
    />
  );
}
