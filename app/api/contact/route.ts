import type { Prisma } from '@prisma/client'
import { createCollectionRoute } from '@/lib/api/collection-route'
import { prisma } from '@/lib/prisma'

const route = createCollectionRoute({
  list: () => prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
  create: (data: Prisma.ContactMessageCreateInput) => prisma.contactMessage.create({ data }),
})

export const GET = route.GET
export const POST = route.POST
