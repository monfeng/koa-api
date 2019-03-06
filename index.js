const Koa = require('koa')
// https://www.npmjs.com/package/koa-bodyparser
const bodyParser = require('koa-bodyparser')
// https://github.com/Automattic/mongoose
// https://cn.mongoosedoc.top/docs/cnhome.html
const mongoose = require('mongoose')
const config = require('./config')
// const jwtKoa = require('koa-jwt')
const example_router = require('./routes/example-route')
const user_router = require('./routes/user-route')
const verify = require('./middleware/verify')

const app = new Koa()


// // 启动db链接
// mongoose.connect('mongodb://localhost:27017/Phone');
// // 关闭的两种方式
// // mongoose.connection.close(); 等同于 db.close();
// mongoose.disconnect();


// 连接数据库
mongoose.connect(config.db, {useNewUrlParser:true}, (err) => {
  if (err) {
    console.error('Failed to connect to database')
  } else {
    console.log('第三：Connecting database successfully')
    // db.close()
  }
})
const db = mongoose.connection

//如果连接成功会执行error回调
db.on('error', function (error) {
  console.log('数据库连接失败：' + error)
})
//如果连接成功会执行open回调
db.on('open', function () {
  console.log('第二：数据库连接成功')
})


db.on('connecting', ()=>{
  console.log('db connecting...')
})
db.on('connected', ()=>{
  console.log('第一：db connected')
})

db.on('disconnecting', ()=>{
  console.log('关闭第一：db disconnecting...')
})
db.on('disconnected', ()=>{
  console.log('关闭第二：db disconnected')
})
db.on('close', ()=>{
  console.log('关闭第三：db close')
})

// 获取token
app.use(verify)


app.use(bodyParser({
  onerror:  (err, ctx) => {
    ctx.throw('body parse error', 422)
  }
}))



// app.use中间件，全局只有app.use的功能
// 支持链接使用
app.use(example_router.routes()).use(example_router.allowedMethods())
app.use(user_router.routes()).use(user_router.allowedMethods())

// error事件的检测，防止服务器挂掉
// app.on('error', (err) => {
//   console.log('logging error ', err.message)
//   console.log(err)
// })

app.listen(config.port)