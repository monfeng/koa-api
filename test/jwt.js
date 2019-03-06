const  jwt = require('jsonwebtoken')
const config = require('../config')

const token = jwt.sign({
  uid: 123,
  name: '1111',
}, config.secret, {expiresIn: 60 * 60 })

console.log(token)

const check = async  () => {
  try {
    const tokenContent = await jwt.verify(token, config.secret);
    console.log(tokenContent)
  } catch (err) {
    console.log(err)
    if ('TokenExpiredError' === err.name) {
      console.log(401, 'token expired');
    }
  }
}
check()

// 8秒后验证一下
setTimeout(check, 8000)




// 15秒后验证一下
setTimeout(check, 15000)


/*
  err = {
    name: 'TokenExpiredError',
    message: 'jwt expired',
    expiredAt: 1408621000
  }
*/

/*
    err = {
      name: 'JsonWebTokenError',
      message: 'jwt malformed'
    }
  */

   /*
      err = {
        name: 'NotBeforeError',
        message: 'jwt not active',
        date: 2018-10-04T16:10:44.000Z
      }
    */