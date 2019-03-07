// https://github.com/auth0/node-jsonwebtoken
const  jwt = require('jsonwebtoken')
const config = require('../config')

const VerifyToken = async(ctx, next) => {
  const authorization = ctx.get('Authorization');
  // console.log(ctx.method)
  // if (ctx.method !== 'OPTIONS' && !authorization) {
  //   // 头部信息与服务器进行协商，看是否符合服务器应答条件
  //   ctx.throw(401, 'no token detected in http header \'Authorization\'');
  // }
  const url = ctx.path
  console.log(url)

  if (url.indexOf('/auth') > -1) {
    // 登录的接口不需要token
    await next()
  } else {
    try {
      const tokenContent = await jwt.verify(authorization, config.secret);
      // 全局设置userId，数据库的查找
      ctx.userId = tokenContent.userId
    } catch (error) {
      if ('TokenExpiredError' === error.name) {
          ctx.throw(401, 'token expired！');
      }
      ctx.throw(401, 'invalid token');
    }
    await next()
  }  
};

module.exports = VerifyToken