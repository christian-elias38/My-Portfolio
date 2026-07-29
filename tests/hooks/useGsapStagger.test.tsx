// @vitest-environment jsdom
import type { ReactNode } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useGsapStagger } from "@/hooks/useGsapReveal";

const { fromTo, registerPlugin, kill, getAll } = vi.hoisted(() => {
  const killMock = vi.fn();
  return {
    fromTo: vi.fn(),
    registerPlugin: vi.fn(),
    kill: killMock,
    getAll: vi.fn(() => [{ kill: killMock }]),
  };
});

vi.mock("gsap", () => ({ default: { fromTo, registerPlugin } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { getAll } }));

const registerPluginCallsOnImport = [...registerPlugin.mock.calls];

function Component({ selector = ".item", children }: { selector?: string; children?: ReactNode }) {
  const ref = useGsapStagger(selector);
  return <div ref={ref}>{children}</div>;
}

describe("useGsapStagger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("animates the matching children of the container", () => {
    render(
      <Component>
        <span className="item">a</span>
        <span className="item">b</span>
        <span className="other">c</span>
      </Component>,
    );

    expect(fromTo).toHaveBeenCalledTimes(1);
    const [items, from, to] = fromTo.mock.calls[0];
    expect(Array.from(items as NodeListOf<Element>)).toHaveLength(2);
    expect(from).toEqual({ opacity: 0, y: 40, scale: 0.95 });
    expect(to).toMatchObject({
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      scrollTrigger: { start: "top 80%" },
    });
  });

  it("registers the ScrollTrigger plugin on import", () => {
    expect(registerPluginCallsOnImport).toEqual([[{ getAll }]]);
  });

  it("kills scroll triggers on unmount", () => {
    const { unmount } = render(<Component />);

    expect(kill).not.toHaveBeenCalled();
    unmount();

    expect(getAll).toHaveBeenCalled();
    expect(kill).toHaveBeenCalledTimes(1);
  });

  it("re-runs the animation when the selector changes", () => {
    const { rerender } = render(<Component selector=".item" />);
    expect(fromTo).toHaveBeenCalledTimes(1);

    rerender(<Component selector=".other" />);

    expect(fromTo).toHaveBeenCalledTimes(2);
    expect(fromTo.mock.calls[1][2]).toMatchObject({ ease: "power3.out", duration: 0.6 });
  });

  it("returns a ref pointing at the rendered element", () => {
    const { container } = render(<Component />);

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    expect(fromTo.mock.calls[0][0]).toBeDefined();
  });
});
