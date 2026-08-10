import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
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
        <h1 className="text-section-title text-foreground mb-4">{post.title}</h1>
        <p className="text-xs text-muted-foreground mb-8">{new Date(post.createdAt).toLocaleDateString()}</p>
        {post.imageUrl && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose prose-invert text-foreground/80 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </Container>
    </Section>
  );
}