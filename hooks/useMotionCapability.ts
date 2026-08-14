"use client";

import { useSyncExternalStore } from "react";

const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(TOUCH_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  return typeof window === "undefined" ? false : window.matchMedia(TOUCH_QUERY).matches;
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  return typeof window === "undefined" ? false : window.matchMedia(MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export interface MotionCapability {
  isTouch: boolean;
  prefersReducedMotion: boolean;
  enableFancyEffects: boolean;
}

export function useMotionCapability(): MotionCapability {
  const isTouch = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerSnapshot);
  const prefersReducedMotion = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerSnapshot);

  return {
    isTouch,
    prefersReducedMotion,
    enableFancyEffects: !isTouch && !prefersReducedMotion,
  };
}
