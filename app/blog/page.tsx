import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import { GlassCard } from "@/components/ui/primitives/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getReadingMinutes } from "@/lib/reading-time";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = (await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })) as BlogPost[];
  } catch {}

  return (
    <Section>
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Writing" title="Blog" />
        </FadeIn>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <GlassCard className="p-0 overflow-hidden">
                    {post.imageUrl && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {!!post.tags?.length && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="rounded-full border-border text-[10px] text-accent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <h3 className="font-bold text-lg text-foreground mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getReadingMinutes(post.content)} min read
                        </span>
                      </div>
                    </div>
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
