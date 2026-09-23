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
import { Mail, CheckCircle2 } from "lucide-react";
import { SiInstagram, SiYoutube, SiX, SiGithub } from "@icons-pack/react-simple-icons";
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
    } catch (err: any) {
      toast.error("Something went wrong", {
        description: err?.message || "Please try again later.",
      });
    }
  }

  return (
    <Section id="contact" className="py-20 bg-[#170d16]">
      <Container className="max-w-5xl">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-12 text-center">
            Let&apos;s Work Together
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Left Column: Form */}
          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-purple-500/20 bg-[#221321] p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Send me a message</h3>
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-3">
                  <CheckCircle2 className="w-12 h-12 text-purple-400" />
                  <p className="text-pink-200/80 font-medium">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSent(false)} className="mt-2 rounded-full border-purple-500/40 text-pink-200">
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
                          <FormLabel className="text-xs font-bold text-pink-200/80">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" className="rounded-xl bg-[#170b16] border-purple-500/30 text-white placeholder:text-pink-200/40 focus-visible:ring-purple-400" {...field} />
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
                          <FormLabel className="text-xs font-bold text-pink-200/80">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" className="rounded-xl bg-[#170b16] border-purple-500/30 text-white placeholder:text-pink-200/40 focus-visible:ring-purple-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-pink-200/80">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell me about your project..." className="min-h-32 rounded-xl bg-[#170b16] border-purple-500/30 text-white placeholder:text-pink-200/40 focus-visible:ring-purple-400" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-transform"
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </FadeIn>

          {/* Right Column: Info & Socials */}
          <FadeIn delay={0.2}>
            <div className="rounded-3xl border border-purple-500/20 bg-[#221321] p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full gap-6">
              <div>
                <p className="text-sm sm:text-base text-pink-100/80 leading-relaxed font-medium mb-6">
                  I&apos;m always open to discussing new opportunities, creative projects, or partnerships. Whether you have a specific project in mind or just want to explore possibilities, I&apos;d love to connect.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-pink-200/90 font-bold mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400 font-extrabold">•</span> Web & Mobile Development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400 font-extrabold">•</span> UI/UX Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400 font-extrabold">•</span> Technical Consulting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400 font-extrabold">•</span> Speaking & Workshops
                  </li>
                </ul>
              </div>

              {/* My Socials */}
              <div className="pt-6 border-t border-purple-500/20">
                <p className="text-xs font-extrabold text-pink-200/90 mb-4 uppercase tracking-wider">My Socials</p>
                <div className="flex items-center gap-4 text-pink-300">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-[#170b16] border border-purple-500/30 hover:text-white hover:border-purple-400 transition-colors">
                    <SiInstagram size={16} />
                  </a>
                  <a href={`mailto:${profile?.email ?? "christianelias102@gmail.com"}`} aria-label="Email" className="p-2.5 rounded-full bg-[#170b16] border border-purple-500/30 hover:text-white hover:border-purple-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="p-2.5 rounded-full bg-[#170b16] border border-purple-500/30 hover:text-white hover:border-purple-400 transition-colors">
                    <SiX size={16} />
                  </a>
                  <a href={profile?.linkedin ?? "https://linkedin.com"} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full bg-[#170b16] border border-purple-500/30 hover:text-white hover:border-purple-400 transition-colors">
                    <LinkedinIcon size={16} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2.5 rounded-full bg-[#170b16] border border-purple-500/30 hover:text-white hover:border-purple-400 transition-colors">
                    <SiYoutube size={16} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
      <Toaster position="bottom-right" richColors />
    </Section>
  );
}
