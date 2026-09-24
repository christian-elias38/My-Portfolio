"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  phone?: string | null;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchMessages() {
    setLoading(true);
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchMessages();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Received Messages</h1>
          <p className="text-sm text-muted-foreground">View and respond to contact form inquiries.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchMessages} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {messages.length === 0 ? (
        <GlassCard className="p-8 text-center text-muted-foreground">
          {loading ? "Loading messages..." : "No messages received yet."}
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <GlassCard key={msg.id} className="p-6 space-y-4 border-border/60 hover:border-primary/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{msg.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-1">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                        <Phone className="w-3.5 h-3.5 text-accent" />
                        {msg.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>

              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{msg.message}</p>

              <div className="pt-2 flex items-center justify-end gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: Portfolio Contact Inquiry&body=Hi ${encodeURIComponent(msg.name)},\n\n`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Reply via Email
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
