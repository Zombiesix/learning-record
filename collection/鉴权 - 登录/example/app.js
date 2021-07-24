const koa = require('koa')
const app = new koa()
const session = require('koa-session')

// koa 中使用 redis
// const redisStore = require('koa-redis')
// const redis = require('redis')
// const redisClient = redis.createClient(6379,, 'localhost')
// const wrapper = require('co-redis') // 对 redis 进行包装
// const client = wrapper(redisClient)

app.keys = ['some secret'] // session 的 value

// 配置对象
const SESS_CONFIG = {
  key: 'kkb:sess', // sid   session 的 key
  // store: redisStore({ client })
}

// 对 session 的封装
app.use(session(SESS_CONFIG, app))

// app.use(async (ctx, next) => {
//   const keys = await clientInformation.keys('*')
//   keys.forEach(async key => {
//     console.log(await client.get(key))
//   })
//   await next()
// })

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return
  
  // 计数器
  let n = ctx.session.count || 0

  ctx.session.count = ++n
  ctx.body = `第${n}次访问`
})

app.listen(3000, () => {
  console.log('server at 3000...');
})
