import { beforeEach, describe, expect, it, vi } from "vitest";

type UploadCallback = (err: Error | undefined, res: unknown) => void;

let onUpload: (options: unknown, cb: UploadCallback) => { end: (buffer: Buffer) => void };

const uploadStream = vi.fn((options: unknown, cb: UploadCallback) => onUpload(options, cb));

vi.mock("@/lib/cloudinary", () => ({
  default: { uploader: { upload_stream: uploadStream } },
}));

const formDataRequest = (file?: File) => {
  const form = new FormData();
  if (file) form.set("file", file);
  return new Request("http://localhost/api/upload", { method: "POST", body: form });
};

describe("app/api/upload POST", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    onUpload = (_options, cb) => ({
      end: () => cb(undefined, { secure_url: "https://cdn.test/x.png" }),
    });
  });

  it("streams the file to cloudinary and returns the upload result", async () => {
    const file = new File(["hello"], "x.png", { type: "image/png" });

    const { POST } = await import("@/app/api/upload/route");
    const res = await POST(formDataRequest(file));

    expect(uploadStream).toHaveBeenCalledWith({ folder: "portfolio" }, expect.any(Function));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ secure_url: "https://cdn.test/x.png" });
  });

  it("sends the file bytes to the upload stream", async () => {
    const end = vi.fn();
    onUpload = (_options, cb) => ({
      end: (buffer: Buffer) => {
        end(buffer);
        cb(undefined, {});
      },
    });

    const { POST } = await import("@/app/api/upload/route");
    await POST(formDataRequest(new File(["hello"], "x.png")));

    expect(end).toHaveBeenCalledWith(Buffer.from("hello"));
  });

  it("returns 400 when no file is provided", async () => {
    const { POST } = await import("@/app/api/upload/route");
    const res = await POST(formDataRequest());

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "No file provided" });
    expect(uploadStream).not.toHaveBeenCalled();
  });

  it("rejects when cloudinary reports an error", async () => {
    onUpload = (_options, cb) => ({ end: () => cb(new Error("upload failed"), undefined) });

    const { POST } = await import("@/app/api/upload/route");

    await expect(POST(formDataRequest(new File(["hello"], "x.png")))).rejects.toThrow(
      "upload failed",
    );
  });
});
