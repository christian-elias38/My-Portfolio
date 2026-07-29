import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { formatDate } from "@/lib/format";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <Section>
      <Container>
        <FadeIn><SectionHeading eyebrow="Writing" title="Blog" /></FadeIn>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <GlassCard className="hover:border-primary/50">
                    <h3 className="font-bold text-lg text-foreground mb-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}