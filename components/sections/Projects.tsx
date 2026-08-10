import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Section } from "@/components/ui/primitives/Section";
import { Container } from "@/components/ui/primitives/Container";
import { SectionHeading } from "@/components/ui/primitives/SectionHeading";
import type { Project } from "@prisma/client";

export async function Projects() {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Selected Work" title="Projects" />
        </FadeIn>
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-sm">No projects added yet.</p>
        ) : (
          <div className="space-y-10">
            {featured.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {featured.map((project, i) => (
                  <FadeIn key={project.id} delay={i * 0.1}>
                    <ProjectCard project={project} />
                  </FadeIn>
                ))}
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {rest.map((project, i) => (
                  <FadeIn key={project.id} delay={i * 0.05}>
                    <ProjectCard project={project} />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}