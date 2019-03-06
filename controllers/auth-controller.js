const uuidv1 = require('uuid/v1');
const config = require('../config')
const passwordUtil = require('../utils/password')
const Auth_col = require('../models/auth');
const setToken = require('../utils/jwt-token')


// 登录
const login = async (ctx) => {
  const body = ctx.request.body
  const {name, password} = body
  ctx.status = 200;
  if (!name || !password) {
    ctx.status = 401;
    ctx.body = {
      code: 0,
      msg: `parameter error！！name or password`,
      desc: `账号或者密码不能为空`,
      data: body
    }
    return;
  }

  // 获取用户的 userId和密码，找不到为null
  const user = await Auth_col.findOne({
    account: name
  });

  if (!user) {
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'account is not exit!',
      desc: `账号不存在`,
      data: user
    }
    return;
  }

  // 验证密码的正确性
  const match = await passwordUtil.validate(password, user.password);
  ctx.status = 200;
  if (match) {
    const token = setToken({
      userId: user.userId
    })
    ctx.body = {
      code: 1,
      msg: 'login success',
      data: {
        token
      }
    }
    return;
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
    const {name, password} = body
    ctx.status = 200;
    if (!name || !password) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: `parameter error！！name or password`,
        desc: `账号或者密码不能为空`,
        data: body
      }
      return;
    }

    // 获取用户的 userId
    const user = await Auth_col.findOne({
      account: name
    });
    if (user) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: 'account is exit!',
        desc: `账号已经存在`,
      }
      return;
    }

    // 插入新用户
    const userId = uuidv1();

    // 加密密码
    const hash = await passwordUtil.encrypt(password, config.saltTimes);
    await Auth_col.create({account: name, password: hash, userId});
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