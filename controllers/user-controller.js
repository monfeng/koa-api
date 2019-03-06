const uuidv1 = require('uuid/v1');
const config = require('../config')
const passwordUtil = require('../utils/password')
const User_col = require('../models/user');


// 登录
const login = async (ctx) => {
  const body = ctx.request.body
  const {name, password} = body
  ctx.status = 200;
  if (!name || !password) {
    ctx.status = 401;
    ctx.body = {
      msg: 'post request!!',
      desc: `parameter error！！name: ${name} password: ${password}`,
      data: body
    }
    return;
  }

  // 获取用户的 userId和密码
  const user = await User_col.findOne({
    account: name
  }, {
    __v: 0,
    _id: 0
  });
  console.log(user)

  if (!user) {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: 'account is not exit!'
    }
    return;
  }

  // 验证密码的正确性
  const match = await passwordUtil.validate(password, user.password);
  ctx.status = 200;
  if (match) {
    ctx.body = {
      code: 1,
      msg: 'login success',
      data: user
    }
    return;
  }

  ctx.body = {
    code: 0,
    msg: 'account or password error!'
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
        msg: 'post request!!',
        desc: `parameter error！！name: ${name} password: ${password}`,
        data: body
      }
      return;
    }

    // 获取用户的 userId
    const user = await User_col.findOne({
      account: name
    }, {
      __v: 0,
      _id: 0
    });
    if (user) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: 'account is exit!'
      }
      return;
    }

    // 插入新用户
    const userId = uuidv1();

    // 加密密码
    const hash = await passwordUtil.encrypt(password, config.saltTimes);
    const result = await User_col.create({account: name, password: hash, userId});
    ctx.body = {
      msg: 'post request!!',
      desc: 'insert success!',
      data: result
    }
  }



module.exports = {
  login,
  register
}