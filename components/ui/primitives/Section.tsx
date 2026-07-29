import { cn } from "@/lib/utils";

export function Section({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  return <section id={id} className={cn("py-32", className)}>{children}</section>;
}
