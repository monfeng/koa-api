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
    let name = body.name || ''
    let password = body.password || ''
    console.log(`signin with name: ${name}, password: ${password}`);
    ctx.status = 200;
    if (!name || !password) {
      ctx.status = 401;
      ctx.body = {
        msg: 'post request!!',
        desc: `parameter error！！msg: ${body.msg}`,
        data: body
      }
      return;
    }

    const result = await Example_col.create({account: name, password});
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