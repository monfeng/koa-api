const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const config = require('./config')
const verify = require('./middleware/verify')
const koaCors = require('./middleware/cors')
const example_router = require('./routes/example-route')
const auth_router = require('./routes/auth-route')
const wechat_router = require('./routes/wechat')
const student_router = require('./routes/student-route')
const template_router = require('./routes/template')
const teacher_router = require('./routes/teacher-route')
const course_router = require('./routes/course-route')
const classHour_router = require('./routes/class-hour-route')


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

app.use(koaCors)

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
app.use(auth_router.routes()).use(auth_router.allowedMethods())
app.use(wechat_router.routes()).use(wechat_router.allowedMethods())
app.use(student_router.routes()).use(student_router.allowedMethods())
app.use(template_router.routes()).use(template_router.allowedMethods())
app.use(teacher_router.routes()).use(teacher_router.allowedMethods())

app.use(course_router.routes()).use(course_router.allowedMethods())
app.use(classHour_router.routes()).use(classHour_router.allowedMethods())

app.listen(config.port, () => {
  console.log('服务器成功启动')
})