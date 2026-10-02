// Tiny password-based admin session (signed cookie). Uses Web Crypto so it
// works in both proxy.ts and route handlers.
export const ADMIN_COOKIE = "admin_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const enc = new TextEncoder();

function secret(): string | null {
    return process.env.ADMIN_SESSION_SECRET || null;
}

async function hmac(value: string, key: string): Promise<string> {
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(key),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(value));
    return Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
    const key = secret();
    if (!key) return null;
    const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
    return `${expires}.${await hmac(String(expires), key)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
    const key = secret();
    if (!key || !token) return false;
    const [expires, signature] = token.split(".");
    if (!expires || !signature) return false;
    if (Number(expires) < Math.floor(Date.now() / 1000)) return false;
    return safeEqual(signature, await hmac(expires, key));
}

export function checkPassword(input: string): boolean {
    const real = process.env.ADMIN_PASSWORD;
    if (!real || !input) return false;
    return safeEqual(input, real);
}

export const SESSION_MAX_AGE = SESSION_SECONDS;
