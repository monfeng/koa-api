const Wechat_col = require('../models/wechat')
const wechatApi = require('../api/wechat')
async function wechatToken (ctx) {
  let data = await Wechat_col.findOne({ name: 'wechat_token'})

  if (!data) { // 不存在
    const {access_token, expires_in} = await wechatApi.getAccessToken()
    const wechatData = await Wechat_col.create({access_token, expires_in})
    data = wechatData
    data.msg = '初始化token' 
  } else {
    const currentDate = new Date().getTime()
    const updateDate = data.updateDate.getTime()
    console.log('从数据库里面拿的')
    const expires = currentDate - updateDate
    if (expires > updateDate.expires_in * 1000 ) {
      const {access_token, expires_in} = await wechatApi.getAccessToken()
      const params = {access_token, expires_in, updateDate: new Date}
      const updateData = await Wechat_col.update({name: 'wechat_token'}, { $set: params}, {upsert: false, multi: false})
      data = updateData 
      data.msg = '更新token了'
      data.data = params
    } else {
      data.msg = '没有更新token,直接在数据库里面拿的'
    }
    
  }
  ctx.body = {
    data
  }
}


module.exports = wechatToken