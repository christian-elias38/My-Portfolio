import { describe, expect, it } from "vitest";

const routes = [
  { name: "blog", load: () => import("@/app/api/blog/route"), message: "Blog API is not enabled." },
  {
    name: "certificates",
    load: () => import("@/app/api/certificates/route"),
    message: "Certificates API is not enabled.",
  },
] as const;

describe.each(routes)("app/api/$name GET", ({ load, message }) => {
  it("responds 404 with a disabled message", async () => {
    const { GET } = await load();
    const res = await GET();

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ message });
  });
});
