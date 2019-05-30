const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisStore = require('koa-redis')
const session = require('koa-session')

const index = require('./routes/index')
const user = require('./routes/user')
const blog = require('./routes/blog')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(json())
app.use(logger())
app.keys=["Wj_67*"]
app.use(session({
  key: 'koa:sess', // 写在客户端里面的标志
  maxAge: 24*60*60*1000,
  httpOnly:true,
  store: redisStore({
    all: 'http://localhost:6379'
  })
}, app))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
