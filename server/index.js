const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const controller = require('./middleware/controller.js')
const staticFile = require('./middleware/staticFile.js')
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  // const user = await User.findByPk(1)
  // ctx.response.body = { name: user.name }
  console.log('request-path:', ctx.request.path)
  if (ctx.request.url === '/favicon.icon') {
    console.log('qingqiu')
  }
  await next()
})
app.use(staticFile('/static/css/', path.resolve(__dirname, '../server/dist/static/css')))
app.use(staticFile('/static/js/', path.resolve(__dirname, '../server/dist/static/js')))
app.use(staticFile('/static/img/', path.resolve(__dirname, '../server/dist/static/img')))
app.use(staticFile('/static/fonts/', path.resolve(__dirname, '../server/dist/static/fonts')))
app.use(bodyParser())
app.use(controller())

app.listen(3000, () => {
  console.log('start')
})
