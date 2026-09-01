"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { Mail, MapPin, Phone, CircleDot, CheckCircle2 } from "lucide-react";
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

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "+251978047173", email: "", message: "" },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }
      setSent(true);
      form.reset();
      toast.success("Message sent", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
    } catch (err: any) {
      toast.error("Something went wrong", {
        description: err?.message || "Please try again later.",
      });
    }
  }

  return (
    <Section id="contact">
      <Container className="max-w-4xl">
        <FadeIn>
          <SectionHeading eyebrow="Get In Touch" title="Let's build something great." align="center" />
        </FadeIn>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <FadeIn delay={0.1}>
            <GlassCard className="p-6 md:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                  <p className="text-muted-foreground">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+251 9XX XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project..." className="min-h-35" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="gradient" size="xl" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <GlassCard className="p-6">
                <h3 className="font-semibold mb-4 text-sm">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">{profile?.email ?? "your-email@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">+251 978 047 173</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-3 h-3 text-green-400" />
                  <span className="text-sm font-semibold">Currently Available</span>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Open to internships, collaborations, and interesting projects.
                </p>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </Container>
      <Toaster position="bottom-right" richColors />
    </Section>
  );
}
