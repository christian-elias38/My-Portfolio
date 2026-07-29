import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const PrismaClient = vi.fn();
const PrismaPg = vi.fn();

vi.mock("@prisma/client", () => ({ PrismaClient }));
vi.mock("@prisma/adapter-pg", () => ({ PrismaPg }));

type GlobalWithPrisma = typeof globalThis & { prisma?: unknown };

describe("lib/prisma", () => {
  const env = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    PrismaClient.mockClear();
    PrismaPg.mockClear();
    delete (globalThis as GlobalWithPrisma).prisma;
    process.env.DATABASE_URL = "postgresql://user:pass@localhost:5432/db";
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = { ...env };
    delete (globalThis as GlobalWithPrisma).prisma;
  });

  it("builds the pg adapter from DATABASE_URL and passes it to the client", async () => {
    const { prisma } = await import("@/lib/prisma");

    expect(PrismaPg).toHaveBeenCalledWith({
      connectionString: "postgresql://user:pass@localhost:5432/db",
    });
    expect(PrismaClient).toHaveBeenCalledWith({ adapter: PrismaPg.mock.instances[0] });
    expect(prisma).toBe(PrismaClient.mock.instances[0]);
  });

  it("caches the client on globalThis outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const { prisma } = await import("@/lib/prisma");

    expect((globalThis as GlobalWithPrisma).prisma).toBe(prisma);
  });

  it("reuses an existing cached client instead of creating a new one", async () => {
    const cached = { marker: "cached" };
    (globalThis as GlobalWithPrisma).prisma = cached;

    const { prisma } = await import("@/lib/prisma");

    expect(prisma).toBe(cached);
    expect(PrismaClient).not.toHaveBeenCalled();
  });

  it("does not cache the client in production", async () => {
    vi.stubEnv("NODE_ENV", "production");

    await import("@/lib/prisma");

    expect((globalThis as GlobalWithPrisma).prisma).toBeUndefined();
  });
});
