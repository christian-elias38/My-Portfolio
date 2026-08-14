import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock } from "lucide-react";
import { getReadingMinutes } from "@/lib/reading-time";
import type { BlogPost } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {}

  if (!post) notFound();

  return (
    <Section>
      <Container className="max-w-2xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to blog
        </Link>

        {!!post.tags?.length && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full border-border text-xs text-accent">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h1 className="text-section-title text-foreground mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-8">
          <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getReadingMinutes(post.content)} min read
          </span>
        </div>

        {post.imageUrl && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 border border-border">
            <Image src={post.imageUrl} alt={post.title} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" priority />
          </div>
        )}

        <div className="prose-article whitespace-pre-line">{post.content}</div>
      </Container>
    </Section>
  );
}
