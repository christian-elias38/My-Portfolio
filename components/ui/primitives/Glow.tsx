import { cn } from "@/lib/utils";

export function Glow({ className }: { className?: string }) {
  return <div className={cn("absolute rounded-full blur-3xl bg-primary/20 pointer-events-none", className)} />;
}
