const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()


const about = ctx => {
  console.log('about')
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}

const main = ctx => {
  console.log('main')
  ctx.response.body = 'Hello World'
}


// app.use中间件，全局只有app.use的功能

router.get('/', main)
router.get('/about', about)

app.use(bodyParser())
app.use(router.routes())

app.listen(3000)