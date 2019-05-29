const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    errno: 0,
    data: {
      username, 
      password
    }
  }
})

router.get('/session-test', async (ctx, next) => {
  if (!ctx.session.viewCount) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount ++
  ctx.body = {
    viewCount: ctx.session.viewCount
  }
})
module.exports = router
