const uuidv1 = require('uuid/v1');
const config = require('../config')
const passwordUtil = require('../utils/password')
const Example_col = require('../models/example');
const User_col = require('../models/user');

const about = ctx => {
  console.log(ctx.request.body)
  ctx.body = '666666'
}
  
const main = async ctx => {
  console.log('main接口')
  // 获取用户的 userId
  const user = await User_col.findOne({
    userId: ctx.userId
  });
  console.log(user)
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: user,
    userId: ctx.userId
  }
}


// 登录
const login = async (ctx) => {
  const body = ctx.request.body
  const {name, password} = body
  console.log(`signin with name: ${name}, password: ${password}`);
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
  const user = await Example_col.findOne({
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

const signin = async (ctx) => {
    const body = ctx.request.body
    const {name, password} = body
    console.log(`signin with name: ${name}, password: ${password}`);
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
    const user = await Example_col.findOne({
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
    const hash = await passwordUtil.encrypt(password, config.saltTimes);
    const result = await Example_col.create({account: name, password: hash, userId});
    ctx.body = {
      msg: 'post request!!',
      desc: 'insert success!',
      data: result
    }
  }


// 错误处理
const err = ctx => {
    ctx.throw(500);
  };

const nofound = ctx => {
ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
}

module.exports = {
  about,
  main,
  signin,
  err,
  nofound,
  login
}