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
import { Mail, CheckCircle2, MapPin, Send } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { toast, Toaster } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [profile, setProfile] = useState<{ name?: string; email?: string; github?: string; linkedin?: string } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
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
      toast.success("Message sent successfully!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Please try again later.";
      toast.error("Something went wrong", {
        description: message,
      });
    }
  }

  return (
    <Section id="contact" className="py-20 bg-transparent">
      <Container className="max-w-5xl">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#d8769c] uppercase font-bold tracking-widest text-xs font-mono mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#d8769c]/60" />
              GET IN TOUCH
              <span className="w-6 h-px bg-[#d8769c]/60" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Let&apos;s Work <span className="text-[#e875a3]">Together</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 items-start">
          {/* Left Column: Info & Details */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-[#4e203f]/70 bg-[#220f1e]/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Send me a message</h3>
                <p className="text-sm text-[#e0c8d4] leading-relaxed font-medium mb-6">
                  I&apos;m always open to discussing new opportunities, creative software projects, or tech collaborations. Feel free to reach out anytime!
                </p>

                <div className="space-y-4 text-sm font-semibold text-[#f4b3cf]">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2b1225] border border-[#522144]">
                    <Mail className="w-4 h-4 text-[#e875a3]" />
                    <span>Email: {profile?.email ?? "christianelias102@gmail.com"}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#2b1225] border border-[#522144]">
                    <MapPin className="w-4 h-4 text-[#e875a3]" />
                    <span>Location: Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-6 border-t border-[#4e203f]/60">
                <p className="text-xs font-bold text-[#d8769c] mb-4 uppercase tracking-wider font-mono">Connect with me</p>
                <div className="flex items-center gap-3 text-[#f4b3cf]">
                  <a href={`mailto:${profile?.email ?? "christianelias102@gmail.com"}`} aria-label="Email" className="p-3 rounded-full bg-[#291124] border border-[#522144] hover:text-white hover:border-[#d66a94] transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href={profile?.linkedin ?? "https://www.linkedin.com/in/christiane-006073382"} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-3 rounded-full bg-[#291124] border border-[#522144] hover:text-white hover:border-[#d66a94] transition-colors">
                    <LinkedinIcon size={16} />
                  </a>
                  <a href={profile?.github ?? "https://github.com/christian-elias38"} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-3 rounded-full bg-[#291124] border border-[#522144] hover:text-white hover:border-[#d66a94] transition-colors">
                    <SiGithub size={16} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Form */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-[#4e203f]/70 bg-[#220f1e]/80 p-6 sm:p-8 shadow-xl">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
                  <CheckCircle2 className="w-12 h-12 text-[#e875a3]" />
                  <p className="text-[#f4b3cf] font-medium">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSent(false)} className="mt-2 rounded-full border-[#522144] text-[#f4b3cf]">
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold text-[#d8769c] font-mono">Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Christian" className="rounded-xl bg-[#1b0a17] border-[#4e203f] text-white placeholder:text-[#d8769c]/40 focus-visible:ring-[#e875a3]" {...field} />
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
                            <FormLabel className="text-xs font-bold text-[#d8769c] font-mono">Your Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@email.com" className="rounded-xl bg-[#1b0a17] border-[#4e203f] text-white placeholder:text-[#d8769c]/40 focus-visible:ring-[#e875a3]" {...field} />
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
                          <FormLabel className="text-xs font-bold text-[#d8769c] font-mono">Your Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project..." className="min-h-32 rounded-xl bg-[#1b0a17] border-[#4e203f] text-white placeholder:text-[#d8769c]/40 focus-visible:ring-[#e875a3]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full rounded-full bg-linear-to-r from-[#b34972] via-[#d66a94] to-[#b34972] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-pink-950/50 hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{form.formState.isSubmitting ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
      <Toaster position="bottom-right" richColors />
    </Section>
  );
}
