"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/motion/FadeIn";
import { Mail, MapPin, CircleDot } from "lucide-react";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { Panel } from "@/components/ui/primitives/Panel";
import { sendJson } from "@/lib/api-client";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    await sendJson("/api/contact", data);
    setSent(true);
    reset();
  }

  return (
    <Section id="contact" className="py-24">
      <Container className="max-w-4xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Get In Touch"
            size="md"
            align="center"
            className="mb-12"
            title={
              <>
                Let&apos;s build <span className="italic text-accent">something great.</span>
              </>
            }
            description="Have a project in mind? I'd love to hear about it — send a message and let's talk."
          />
        </FadeIn>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
          <FadeIn delay={0.1}>
            <Panel>
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
                    <Input placeholder="your@email.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Textarea placeholder="Your message..." {...register("message")} />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Panel>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <Panel>
                <h3 className="font-semibold mb-4 text-sm">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">your-email@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-foreground/70">Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </Panel>
              <Panel>
                <div className="flex items-center gap-2 mb-2">
                  <CircleDot className="w-3 h-3 text-green-400" />
                  <span className="text-sm font-semibold">Currently Available</span>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Open to internships, collaborations, and interesting projects.
                </p>
              </Panel>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
