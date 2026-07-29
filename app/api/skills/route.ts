import type { Prisma } from '@prisma/client'
import { createCollectionRoute } from '@/lib/api/collection-route'
import { prisma } from '@/lib/prisma'

const route = createCollectionRoute({
  list: () => prisma.skill.findMany({ orderBy: { category: 'asc' } }),
  create: (data: Prisma.SkillCreateInput) => prisma.skill.create({ data }),
})

export const GET = route.GET
export const POST = route.POST
