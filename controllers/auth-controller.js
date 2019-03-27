const uuidv1 = require('uuid/v1')
const passwordUtil = require('../utils/password')
const Auth_col = require('../models/auth')
const setToken = require('../utils/jwt-token')


// 登录
const login = async (ctx) => {
  const body = ctx.request.body
  const {account, password} = body
  ctx.status = 200
  if (!account || !password) {
    ctx.status = 401
    ctx.body = {
      code: 0,
      msg: 'parameter error！！name or password',
      desc: '账号或者密码不能为空',
      data: body
    }
    return
  }

  // 获取用户的 userId和密码，找不到为null
  const user = await Auth_col.findOne({
    account: account
  })

  if (!user) {
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'account is not exit!',
      desc: '账号不存在',
      data: user
    }
    return
  }

  console.log(user)

  // 验证密码的正确性
  const match = await passwordUtil.validate(password, user.password)
  console.log(match)
  ctx.status = 200
  if (match) {
    const token = setToken({
      userId: user.userId
    })
    ctx.body = {
      code: 1,
      msg: 'login success',
      desc: '登录成功',
      data: {
        token
      }
    }
    return
  }

  ctx.body = {
    code: 0,
    desc: '账号或者密码错误,请输入正确的',
    msg: 'account or password error!',
    data: user
  }
}

/**
 * 注册
 * @param {*} ctx 
 */
const register = async (ctx) => {
  const body = ctx.request.body
  const {account, password, mobile, name} = body
  ctx.status = 200
  if (!account || !password || !mobile) {
    ctx.status = 401
    ctx.body = {
      code: 0,
      msg: 'parameter error！！name or password',
      desc: '账号或者密码不能为空',
      data: body
    }
    return
  }

  // 获取用户的 userId
  const user = await Auth_col.findOne({
    account: account
  })
  if (user) {
    ctx.status = 401
    ctx.body = {
      code: 0,
      msg: 'account is exit!',
      desc: '账号已经存在',
    }
    return
  }

  // 插入新用户
  const userId = uuidv1()

  // 加密密码
  const hash = await passwordUtil.encrypt(password)
  await Auth_col.create({account: account, password: hash, userId, mobile, name})
  ctx.body = {
    code: 1,
    msg: 'insert success',
    desc: '注册成功'
  }
}



module.exports = {
  login,
  register
}