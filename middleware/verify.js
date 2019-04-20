// https://github.com/auth0/node-jsonwebtoken
const  jwt = require('jsonwebtoken')
const config = require('../config')
const VerityUrl = 'auth'

const VerifyToken = async(ctx, next) => {
  // 如果是option请求过去
  if (ctx.method === 'OPTIONS') {
    await next()
    return
  }
  
  // 如果是非token请求过去
  const url = ctx.path
  console.log(url)
  if (url.indexOf(VerityUrl) > -1) {
    await next()
    return
  }

  const authorization = ctx.get('Authorization')
  try {
    const tokenContent = await jwt.verify(authorization, config.secret)
    // 全局设置userId，数据库的查找
    ctx.userId = tokenContent.userId
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 401
    const body = {
      code: 0,
      error,
      msg: 'TokenExpiredError' === error.name ? 'token expired' : 'invalid token',
      desc: 'token失效或者不合法，请重新登录页面'
    }
    ctx.body = body
    // ctx.throw(403, 'token expired！')
    // ctx.throw(403, 'invalid token')
  }
 
}

module.exports = VerifyToken