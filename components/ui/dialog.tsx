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
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [currentOpen, setOpen]);

  if (!currentOpen) return null;

  return (
    <DialogContext.Provider value={{ open: currentOpen, setOpen }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setOpen(false)} />
        {children}
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
    <div
      onWheel={(e) => e.stopPropagation()}
      className={cn(
        "relative z-10 w-full max-w-lg rounded-3xl border border-[#504234] bg-[#1E1518] p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain custom-scrollbar text-white",
        className
      )}
    >
      {children}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#504234] bg-[#24151C] text-xs font-bold text-[#E6C88A] hover:bg-[#504234] hover:text-white transition-all shadow-md cursor-pointer"
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
