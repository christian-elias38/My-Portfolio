import { cn } from "@/lib/utils";

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("bg-card/50 border border-border rounded-2xl p-6", className)}>{children}</div>;
}
