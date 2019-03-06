const Koa = require('koa')
// https://www.npmjs.com/package/koa-bodyparser
const bodyParser = require('koa-bodyparser')
// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')
const config = require('./config')
const example_router = require('./routes/example-route')
const app = new Koa()

// 连接数据库
mongoose.connect(config.db, {useNewUrlParser:true}, (err) => {
  if (err) {
    console.error('Failed to connect to database')
  } else {
    console.log('Connecting database successfully')
  }
})

app.use(bodyParser({
  onerror:  (err, ctx) => {
    ctx.throw('body parse error', 422)
  }
}))



// app.use中间件，全局只有app.use的功能
// 支持链接使用
app.use(example_router.routes()).use(example_router.allowedMethods())

// error事件的检测，防止服务器挂掉
// app.on('error', (err) => {
//   console.log('logging error ', err.message)
//   console.log(err)
// })

app.listen(config.port)