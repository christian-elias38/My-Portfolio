"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="text-muted-foreground text-sm max-w-md">
        This page failed to load. Please try again — if the problem persists, come back a little later.
      </p>
      {error.digest && <p className="text-xs text-muted-foreground/70">Reference: {error.digest}</p>}
      <button onClick={reset} className="text-primary underline text-sm">
        Try again
      </button>
    </div>
  );
}
