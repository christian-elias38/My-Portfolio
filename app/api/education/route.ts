import type { Prisma } from '@prisma/client'
import { createCollectionRoute } from '@/lib/api/collection-route'
import { prisma } from '@/lib/prisma'

const route = createCollectionRoute({
  list: () => prisma.education.findMany({ orderBy: { startYear: 'desc' } }),
  create: (data: Prisma.EducationCreateInput) => prisma.education.create({ data }),
})

export const GET = route.GET
export const POST = route.POST
