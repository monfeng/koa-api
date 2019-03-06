const  jwt = require('jsonwebtoken')
const config = require('../config')

const VerifyToken = async(ctx, next) => {
  const authorization = ctx.get('Authorization');
  const url = ctx.path
  console.log('来了', url)
  console.log('token', authorization)

  if (!authorization) {
    ctx.throw(401, 'no token detected in http header \'Authorization\'');
  }

  if (url.indexOf('/users') > -1) {
    console.log('不需要token')
    await next()
  } else {
    console.log('需要token')
    try {
      const tokenContent = await jwt.verify(authorization, config.secret);
      console.log(tokenContent)
      console.log(tokenContent.name)
      ctx.name = tokenContent.name
      console.log('鉴权成功');
    } catch (error) {
      console.log(error.name)
      if ('TokenExpiredError' === error.name) {
          ctx.throw(401, 'token expired！');
      }
      ctx.throw(401, 'invalid token');
    }
    await next()
  }  
};

module.exports = VerifyToken