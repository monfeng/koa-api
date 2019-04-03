
const Auth_col = require('../models/auth')

// 获取用户的信息
const fetchUserInfo = async (ctx) => {
  const id = ctx.userId


  // 获取用户的 userId的信息
  try {
    const user = await Auth_col.findOne({
      userId: id
    })
    if (!user) {
      ctx.status = 403
      ctx.body = {
        code: 1,
        msg: 'account is not exit!',
        desc: '账号信息不存在',
        data: user
      }
      return
    }

    // "status": 1,
    // "_id": "5ca04881fd926c3bf72e84a1",
    // "account": "yangpu@qq.com",
    // "password": "50905d7b2216bfeccb5b41016357176b",
    // "userId": "5b265740-5371-11e9-9cf7-0f021316e3c6",
    // "mobile": "13800013800",
    // "name": "yangpu",

    const { status, account, name, mobile, userId } = user
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'success',
      desc: '获取成功',
      data: { status, account, name, mobile, userId }
    }
  } catch (error) {
    ctx.status = 403
    ctx.body = {
      code: 0,
      msg: 'account is not exit!',
      desc: '账号信息不存在',
      error
    }
  }
}



module.exports = {
  fetchUserInfo
}