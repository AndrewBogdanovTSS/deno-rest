import {Application} from 'https://deno.land/x/oak/mod.ts'
import {getEnv} from './utils/env.ts'
import router from './routes/resources.ts'

const app: Application = new Application()
const port: string = getEnv('PORT') || '8001'

// Setting CORS headers
app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  await next()
})
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({port: 8001})
console.log(`Server started on port ${port}...`)
