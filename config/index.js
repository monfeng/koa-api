module.exports = {
  port: 3330, // 项目启动的端口
  secret: 'secret', // jwt加密的秘钥
  db: 'mongodb://localhost:27017/koa-api', // 数据库
  saltTimes: 3, // 加密的次数（用户密码加密）
  prefix: '/v1' // api的前缀
}