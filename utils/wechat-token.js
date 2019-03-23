const Wechat_col = require('../models/wechat')
const wechatApi = require('../api/wechat')

// 数据库里面没有
async function getformWechat (data) {
  if (!data) {
    const {access_token, expires_in} = await wechatApi.getAccessToken()
    await Wechat_col.create({access_token, expires_in})
    console.log('从微信拿的，初始化数据库')
    return {access_token, expires_in, updateDate: new Date(), msg: '从微信拿的，初始化数据库'}
  } else {
    return 'next'
  }
}
  
// 数据库里面有,但是已经失效了
async function updateWechatToken (data) {
  const now = new Date()
  const currentDate = now.getTime()
  const updateDate = data.updateDate.getTime()
  const expires = currentDate - updateDate
  if (expires > updateDate.expires_in * 1000 ) {
    const {access_token, expires_in} = await wechatApi.getAccessToken()
    const params = {access_token, expires_in, updateDate: now}
    await Wechat_col.update({name: 'wechat_token'}, { $set: params}, {upsert: false, multi: false})
    console.log('从微信更新到数据库里面')
    return {access_token, expires_in, updateDate: now, meg: '从微信更新到数据库里面'}
  } else {
    return 'next'
  }
}
  
// 数据库里面有没有失效
async function getformDatabase (data) {
  const {access_token, expires_in, updateDate} = data
  console.log('没有更新token,直接在数据库里面拿的')
  return {access_token, expires_in, updateDate, msg: '没有更新token,直接在数据库里面拿的'}
}
  
  
Function.prototype.after = function( fn ){
  const self = this
  return async function(){
    const ret = await self.apply( this, arguments )
    if ( ret === 'next' ){
      return await fn.apply( this, arguments )
    }
    return ret
  }
}
  
  
async function wechatToken () {
  let data = await Wechat_col.findOne({ name: 'wechat_token'})
  const fun = getformWechat.after(updateWechatToken).after(getformDatabase)
  const result = await fun(data)
  return result
}


module.exports = wechatToken