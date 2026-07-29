import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const config = vi.fn();

vi.mock("cloudinary", () => ({
  v2: { config, uploader: { upload_stream: vi.fn() } },
}));

describe("lib/cloudinary", () => {
  const env = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    config.mockClear();
    process.env.CLOUDINARY_CLOUD_NAME = "test-cloud";
    process.env.CLOUDINARY_API_KEY = "test-key";
    process.env.CLOUDINARY_API_SECRET = "test-secret";
  });

  afterEach(() => {
    process.env = { ...env };
  });

  it("configures the sdk from environment variables", async () => {
    await import("@/lib/cloudinary");

    expect(config).toHaveBeenCalledWith({
      cloud_name: "test-cloud",
      api_key: "test-key",
      api_secret: "test-secret",
    });
  });

  it("passes undefined credentials through when env vars are missing", async () => {
    delete process.env.CLOUDINARY_CLOUD_NAME;
    delete process.env.CLOUDINARY_API_KEY;
    delete process.env.CLOUDINARY_API_SECRET;

    await import("@/lib/cloudinary");

    expect(config).toHaveBeenCalledWith({
      cloud_name: undefined,
      api_key: undefined,
      api_secret: undefined,
    });
  });

  it("exports the configured cloudinary instance", async () => {
    const cloudinary = (await import("@/lib/cloudinary")).default;

    expect(cloudinary.config).toBe(config);
  });
});
