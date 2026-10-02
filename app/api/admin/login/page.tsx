"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/primitives/GlassCard";

function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error || "Login failed");
                return;
            }
            const next = params.get("next");
            router.replace(next && next.startsWith("/admin") ? next : "/admin/messages");
            router.refresh();
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <GlassCard className="w-full max-w-sm p-8 space-y-5">
            <div className="flex items-center gap-2 text-foreground">
                <Lock className="w-5 h-5 text-accent" />
                <h1 className="text-xl font-bold">Admin login</h1>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>
        </GlassCard>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    );
}
