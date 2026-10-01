import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const method = req.method;

    // Always-public paths
    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
        return NextResponse.next();
    }
    // Visitors may submit the contact form
    if (pathname === "/api/contact" && method === "POST") {
        return NextResponse.next();
    }

    const isAdminPage = pathname.startsWith("/admin");
    const isApi = pathname.startsWith("/api");
    const isReadOnlyApi = isApi && (method === "GET" || method === "HEAD");
    // Public site reads (profile, projects, skills...) stay open, except messages.
    const needsAuth =
        isAdminPage || (isApi && !isReadOnlyApi) || pathname === "/api/contact";

    if (!needsAuth) return NextResponse.next();

    const ok = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (ok) return NextResponse.next();

    if (isApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*"],
};