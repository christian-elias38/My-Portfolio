import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Sends you an email for every new message (Resend REST API, no extra package).
async function notifyByEmail(m: { name: string; email: string; phone: string | null; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("Email notification skipped: RESEND_API_KEY or CONTACT_NOTIFY_EMAIL not set");
    return false;
  }
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: m.email,
      subject: `New portfolio message from ${m.name}`,
      text: `Name: ${m.name}\nEmail: ${m.email}\nPhone: ${m.phone ?? "-"}\n\n${m.message}`,
      html: `<h2>New portfolio message</h2>
<p><b>Name:</b> ${escapeHtml(m.name)}<br/>
<b>Email:</b> <a href="mailto:${escapeHtml(m.email)}">${escapeHtml(m.email)}</a><br/>
<b>Phone:</b> ${escapeHtml(m.phone ?? "-")}</p>
<p style="white-space:pre-wrap">${escapeHtml(m.message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const phone = body.phone ? String(body.phone).trim().slice(0, 40) : null;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (name.length > 100 || message.length > 5000) {
    return NextResponse.json({ error: "Name or message is too long" }, { status: 400 });
  }

  const data = { name, email, phone, message };

  // Try both; the visitor only sees success if the message was stored or emailed.
  const [dbResult, emailResult] = await Promise.allSettled([
    prisma.contactMessage.create({ data }),
    notifyByEmail(data),
  ]);

  const saved = dbResult.status === "fulfilled";
  const emailed = emailResult.status === "fulfilled" && emailResult.value === true;

  if (dbResult.status === "rejected") {
    console.error("Failed to save contact message:", dbResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Failed to email contact message:", emailResult.reason);
  }

  if (!saved && !emailed) {
    return NextResponse.json(
      { error: "Sorry, your message could not be sent. Please try again or email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// Admin only (also enforced in proxy.ts)
export async function GET() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (err) {
    console.error("Failed to load messages:", err);
    const detail = err instanceof Error ? err.message.slice(0, 400) : String(err);
    return NextResponse.json({ error: "Could not load messages", detail }, { status: 500 });
  }
}