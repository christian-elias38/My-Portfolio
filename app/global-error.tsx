"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", textAlign: "center", padding: "1.5rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 700 }}>Something went wrong</h1>
          <p>The application failed to load.</p>
          {error.digest && <p style={{ fontSize: "0.75rem" }}>Reference: {error.digest}</p>}
          <button onClick={reset} style={{ textDecoration: "underline" }}>Try again</button>
        </div>
      </body>
    </html>
  );
}
