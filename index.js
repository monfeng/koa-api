const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const example_router = require('./routes/example-route')
const app = new Koa()


app.use(bodyParser({
  onerror:  (err, ctx) => {
    ctx.throw('body parse error', 422)
  }
}))



// app.use中间件，全局只有app.use的功能
// 支持链接使用
app.use(example_router.routes()).use(example_router.allowedMethods())

app.listen(3000)