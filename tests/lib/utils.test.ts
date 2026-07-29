import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins plain class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("supports arrays and conditional objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("keeps the last of conflicting tailwind utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm text-red-500", "text-blue-500")).toBe("text-sm text-blue-500");
  });

  it("does not merge classes from different tailwind groups", () => {
    expect(cn("mt-2", "mb-4")).toBe("mt-2 mb-4");
  });

  it("returns an empty string with no arguments", () => {
    expect(cn()).toBe("");
  });
});
