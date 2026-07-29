import type { Prisma } from '@prisma/client'
import { createCollectionRoute } from '@/lib/api/collection-route'
import { prisma } from '@/lib/prisma'

const route = createCollectionRoute({
  list: () => prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
  create: (data: Prisma.ExperienceCreateInput) => prisma.experience.create({ data }),
})

export const GET = route.GET
export const POST = route.POST
