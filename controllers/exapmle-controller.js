// const User_col = require('../models/student')

const get = ctx => {
  console.log(ctx.query)
  ctx.body = '666666'
}

const post =  ctx => {
  
  console.log(ctx.request.body)
  ctx.body = '55555'
}

// 错误处理
const err = ctx => {
  ctx.throw(500)
}

const nofound = ctx => {
  ctx.response.status = 404
  ctx.response.body = 'Page Not Found'
}

module.exports = {
  get,
  post,
  err,
  nofound
}
