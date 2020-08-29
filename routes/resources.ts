import {Router} from 'https://deno.land/x/oak/mod.ts'
import {RouterContext} from 'https://deno.land/x/oak/mod.ts'
import Resource, {IResource} from '../models/resource.ts'

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
  >

const router = new Router()

router.get('/resources', async (ctx:RContext) => {
  const data = await Resource.getAll()
  ctx.response.body = {data}
})
router.post('/resource', async (ctx:RContext) => {
  const body = await ctx.request.body()
  const id = await Resource.add(await body.value as IResource)

  ctx.response.body = {data: {id}}
})
router.patch('/resource/:id', async (ctx:RContext) => {
  const body = await ctx.request.body()
  const data = await body.value
  const {id} = ctx.params
  const updatedResource = await Resource.update(id!, data)
  ctx.response.body = {data: updatedResource}
})

router.delete('/resource/:id', async (ctx:RContext) => {
  const {id} = ctx.params
  ctx.response.body = {data: await Resource.delete(id!)}
})

export default router