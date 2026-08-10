"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/FadeIn";
import { Mail, MapPin, Phone, CircleDot } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(7, "Phone is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [profile, setProfile] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "+251978047173" },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      reset();
      toast.success("Message sent", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-24">
      <FadeIn>
        <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3 text-center">Get In Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          Let&apos;s build <span className="italic text-accent">something great.</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto mb-12">
          Have a project in mind? I&apos;d love to hear about it — send a message and let&apos;s talk.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-card/50 border border-border rounded-2xl p-6">
            {sent ? (
              <p className="text-center text-muted-foreground py-12">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input placeholder="Your name..." {...register("name")} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Input placeholder="Phone number" {...register("phone")} />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input placeholder="your@email.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Your message..."
                    {...register("message")}
                    className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm min-h-[140px]"
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <div className="bg-card/50 border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4 text-sm">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-foreground/70">{profile?.email ?? "your-email@example.com"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-foreground/70">+251978047173</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-foreground/70">Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
            <div className="bg-card/50 border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <CircleDot className="w-3 h-3 text-green-400" />
                <span className="text-sm font-semibold">Currently Available</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Open to internships, collaborations, and interesting projects.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
      <Toaster position="bottom-right" richColors />
    </section>
  );
}