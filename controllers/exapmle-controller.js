const uuidv1 = require('uuid/v1');
const config = require('../config')
const passwordUtil = require('../utils/password')
const Example_col = require('../models/example');

const about = ctx => {
  console.log('about')
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}
  
const main = ctx => {
  console.log('main')
  ctx.response.body = 'Hello World'
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
  nofound
}