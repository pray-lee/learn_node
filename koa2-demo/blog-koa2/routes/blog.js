const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  ctx.body = {
    errno: 0,
    list: [
      1,2,3
    ]
  }
})

router.get('/detail', async (ctx, next) => {
  console.log('------------------------------------------------------/n')
  console.log(ctx.request.header)
  console.log('==============')
  console.log(ctx.response.headers)
  // const id = ctx.request.id
  ctx.body = {
    errno: 0,
    data: {
      a: 1,
      b: 2
    }
  }
})

module.exports = router
