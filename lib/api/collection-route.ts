import { NextResponse } from 'next/server'

interface CollectionRouteOptions<TItem, TCreateInput> {
  list: () => Promise<TItem[]>
  create: (data: TCreateInput) => Promise<TItem>
}

export function createCollectionRoute<TItem, TCreateInput>({
  list,
  create,
}: CollectionRouteOptions<TItem, TCreateInput>) {
  return {
    async GET() {
      return NextResponse.json(await list())
    },
    async POST(req: Request) {
      const data = (await req.json()) as TCreateInput
      return NextResponse.json(await create(data))
    },
  }
}

export function createDisabledRoute(resource: string) {
  return {
    async GET() {
      return NextResponse.json({ message: `${resource} API is not enabled.` }, { status: 404 })
    },
  }
}
