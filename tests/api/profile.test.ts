import { beforeEach, describe, expect, it, vi } from "vitest";

const prisma = { profile: { findFirst: vi.fn(), update: vi.fn() } };

vi.mock("@/lib/prisma", () => ({ prisma }));

const patchRequest = (body: unknown) =>
  new Request("http://localhost/api/profile", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("app/api/profile PATCH", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates the existing profile", async () => {
    prisma.profile.findFirst.mockResolvedValue({ id: "p1", headline: "old" });
    prisma.profile.update.mockResolvedValue({ id: "p1", headline: "new" });

    const { PATCH } = await import("@/app/api/profile/route");
    const res = await PATCH(patchRequest({ headline: "new" }));

    expect(prisma.profile.update).toHaveBeenCalledWith({
      where: { id: "p1" },
      data: { headline: "new" },
    });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ id: "p1", headline: "new" });
  });

  it("returns 404 when no profile exists", async () => {
    prisma.profile.findFirst.mockResolvedValue(null);

    const { PATCH } = await import("@/app/api/profile/route");
    const res = await PATCH(patchRequest({ headline: "new" }));

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ error: "No profile found" });
    expect(prisma.profile.update).not.toHaveBeenCalled();
  });

  it("propagates update failures", async () => {
    prisma.profile.findFirst.mockResolvedValue({ id: "p1" });
    prisma.profile.update.mockRejectedValue(new Error("db down"));

    const { PATCH } = await import("@/app/api/profile/route");

    await expect(PATCH(patchRequest({ headline: "new" }))).rejects.toThrow("db down");
  });

  it("rejects an invalid json body before touching the database", async () => {
    const { PATCH } = await import("@/app/api/profile/route");
    const bad = new Request("http://localhost/api/profile", { method: "PATCH", body: "{" });

    await expect(PATCH(bad)).rejects.toThrow();
    expect(prisma.profile.findFirst).not.toHaveBeenCalled();
  });
});
