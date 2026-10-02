import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE,
    SESSION_MAX_AGE,
    checkPassword,
    createSessionToken,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
    const { password } = await req.json().catch(() => ({ password: "" }));

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
        return NextResponse.json(
            { error: "Admin login is not configured on the server." },
            { status: 500 }
        );
    }
    if (!checkPassword(String(password ?? ""))) {
        // small delay to slow down guessing
        await new Promise((r) => setTimeout(r, 600));
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
    });
    return res;
}