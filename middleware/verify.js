const  jwt = require('jsonwebtoken')
const config = require('../config')

const VerifyToken = async(ctx, next) => {
  const authorization = ctx.get('Authorization');
  const url = ctx.path

  if (!authorization) {
    ctx.throw(401, 'no token detected in http header \'Authorization\'');
  }

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