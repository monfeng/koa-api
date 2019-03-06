const  jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * 设置一个小时的token
 * @param {*} payload 
 */
function setToken (payload) {
  return jwt.sign(payload, config.secret, {expiresIn: 60 * 60 })
}

module.exports = setToken