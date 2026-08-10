"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type DialogContext = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = React.createContext<DialogContext | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within Dialog");
  return ctx;
}

function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange?: (v: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(open);
  const isControlled = onOpenChange !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  const setOpen = React.useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  React.useEffect(() => {
    if (!currentOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [currentOpen, setOpen]);

  if (!currentOpen) return null;

  return (
    <DialogContext.Provider value={{ open: currentOpen, setOpen }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-popover p-6 shadow-xl">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  const { setOpen } = useDialogContext();
  const child = React.Children.only(children);
  if (asChild && React.isValidElement(child)) {
    return React.cloneElement(child as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(true),
    });
  }
  return (
    <button onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { setOpen } = useDialogContext();
  return (
    <div className={cn("max-h-[85vh] overflow-y-auto", className)}>
      {children}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-md border border-border text-xs hover:bg-muted"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold text-foreground", className)}>{children}</h2>;
}

function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
