import { NextResponse } from 'next/server'
import { z } from 'zod'

const url = z.string().url().max(2048)

export const contactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(1).max(5000),
  })
  .strict()

export const projectSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(5000),
    imageUrl: url.optional(),
    githubUrl: url.optional(),
    liveUrl: url.optional(),
    featured: z.boolean().optional(),
    technologies: z.array(z.string().trim().min(1).max(50)).max(50).optional(),
  })
  .strict()

export const skillSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    category: z.string().trim().min(1).max(100),
    level: z.number().int().min(0).max(100),
  })
  .strict()

export const experienceSchema = z
  .object({
    company: z.string().trim().min(1).max(200),
    role: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(5000),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  })
  .strict()

export const educationSchema = z
  .object({
    institution: z.string().trim().min(1).max(200),
    college: z.string().trim().max(200).optional(),
    degree: z.string().trim().min(1).max(200),
    field: z.string().trim().min(1).max(200),
    startYear: z.number().int().min(1900).max(2200),
    endYear: z.number().int().min(1900).max(2200).optional(),
    description: z.string().trim().max(5000).optional(),
  })
  .strict()

export const profileUpdateSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    headline: z.string().trim().max(200).optional(),
    bio: z.string().trim().max(5000).optional(),
    location: z.string().trim().max(200).optional(),
    github: url.or(z.literal('')).optional(),
    linkedin: url.or(z.literal('')).optional(),
    twitter: url.or(z.literal('')).optional(),
    website: url.or(z.literal('')).optional(),
    resumeUrl: url.or(z.literal('')).optional(),
    profileImage: url.or(z.literal('')).optional(),
  })
  .strict()

/**
 * Parses a JSON request body against `schema`, returning either the validated
 * data or a 400 response. Unknown keys are rejected so request bodies can never
 * be used to set fields the caller should not control.
 */
export async function parseJsonBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T,
): Promise<{ data: z.infer<T>; error: null } | { data: null; error: NextResponse }> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return { data: null, error: NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }) }
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return {
      data: null,
      error: NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten() },
        { status: 400 },
      ),
    }
  }
  return { data: result.data, error: null }
}
