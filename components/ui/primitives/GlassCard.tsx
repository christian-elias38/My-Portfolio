import { cn } from "@/lib/utils";

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-[#221321] border border-[#3b233a] rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
