
const Auth_col = require('../models/auth')

// 获取用户的信息
const fetchUserInfo = async (ctx) => {
  const  id  = ctx.userId
    

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

    const { password, ...data } = user
    console.log(password)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'success',
      desc: '获取成功',
      data
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