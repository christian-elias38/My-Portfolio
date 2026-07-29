import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm min-h-[140px]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
