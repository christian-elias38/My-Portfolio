import { beforeEach, describe, expect, it, vi } from "vitest";

const prisma = {
  contactMessage: { create: vi.fn(), findMany: vi.fn() },
  education: { create: vi.fn(), findMany: vi.fn() },
  experience: { create: vi.fn(), findMany: vi.fn() },
  project: { create: vi.fn(), findMany: vi.fn() },
  skill: { create: vi.fn(), findMany: vi.fn() },
};

vi.mock("@/lib/prisma", () => ({ prisma }));

const jsonRequest = (body: unknown) =>
  new Request("http://localhost/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

type Delegate = { create: ReturnType<typeof vi.fn>; findMany: ReturnType<typeof vi.fn> };

const cases = [
  {
    name: "contact",
    load: () => import("@/app/api/contact/route"),
    delegate: () => prisma.contactMessage,
    orderBy: { createdAt: "desc" },
    payload: { name: "Ada", email: "ada@example.com", message: "Hi" },
  },
  {
    name: "education",
    load: () => import("@/app/api/education/route"),
    delegate: () => prisma.education,
    orderBy: { startYear: "desc" },
    payload: { school: "MIT", degree: "BSc", startYear: 2018 },
  },
  {
    name: "experience",
    load: () => import("@/app/api/experience/route"),
    delegate: () => prisma.experience,
    orderBy: { startDate: "desc" },
    payload: { company: "Acme", role: "Engineer" },
  },
  {
    name: "projects",
    load: () => import("@/app/api/projects/route"),
    delegate: () => prisma.project,
    orderBy: { createdAt: "desc" },
    payload: { title: "Portfolio", description: "A site" },
  },
  {
    name: "skills",
    load: () => import("@/app/api/skills/route"),
    delegate: () => prisma.skill,
    orderBy: { category: "asc" },
    payload: { name: "TypeScript", category: "language" },
  },
] as const;

describe.each(cases)("app/api/$name", ({ load, delegate, orderBy, payload }) => {
  let model: Delegate;

  beforeEach(() => {
    vi.clearAllMocks();
    model = delegate() as Delegate;
  });

  it("GET returns the ordered records as json", async () => {
    const records = [{ id: "1" }, { id: "2" }];
    model.findMany.mockResolvedValue(records);

    const { GET } = await load();
    const res = await GET();

    expect(model.findMany).toHaveBeenCalledWith({ orderBy });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(records);
  });

  it("GET returns an empty list when there are no records", async () => {
    model.findMany.mockResolvedValue([]);

    const { GET } = await load();

    await expect((await GET()).json()).resolves.toEqual([]);
  });

  it("POST creates a record from the request body", async () => {
    const created = { id: "1", ...payload };
    model.create.mockResolvedValue(created);

    const { POST } = await load();
    const res = await POST(jsonRequest(payload));

    expect(model.create).toHaveBeenCalledWith({ data: payload });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(created);
  });

  it("POST rejects when prisma fails", async () => {
    model.create.mockRejectedValue(new Error("db down"));

    const { POST } = await load();

    await expect(POST(jsonRequest(payload))).rejects.toThrow("db down");
  });

  it("POST rejects on an invalid json body", async () => {
    const { POST } = await load();
    const bad = new Request("http://localhost/api", { method: "POST", body: "not-json" });

    await expect(POST(bad)).rejects.toThrow();
    expect(model.create).not.toHaveBeenCalled();
  });
});
