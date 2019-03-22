// 微信公众号nodejs开发如何发送模板消息wechatapi:https://blog.csdn.net/qq_40312194/article/details/80232557
// Nodejs + express 开发微信公众号模板消息推送功能:https://blog.csdn.net/lihefei_coder/article/details/81907638
const config = require('../config/wechat') //引入配置文件
const wechatApi = require('../api/wechat')
/**
 * [创建请求微信网页授权接口链接]
 */

function authentication (ctx) {

  const appid = config.appID
  const redirect_uri = encodeURIComponent('http://dsvwku.natappfree.cc/code') //这里的url需要转为加密格式，它的作用是访问微信网页鉴权接口成功后微信会回调这个地址，并把code参数带在回调地址中
  // const scope = 'snsapi_userinfo'
  const scope = 'snsapi_base'
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`

  const html =
  `<!DOCTYPE html>
  <html>
      <head>
      <meta charset="utf-8" >
      <title>微信鉴权引导</title>
      </head>
      <body><a href="${url}">跳转到鉴权页面</a></body>
  </html>`
  ctx.type = 'text/html'

  ctx.body = html
}


/**
 * 网页授权回调接口，可以获取code
 */

async function getCode (ctx) {

  const {code} = ctx.query //微信回调这个接口后会把code参数带过来
  const body = await wechatApi.getOpenId(code) //把code传入getOpenId方法

  const openid =  body.openid
  console.log(openid)
  const data = await wechatApi.getAccessToken(openid) 

  const access_token= data.access_token

  const requestData = { //发送模板消息的数据
    touser: openid,
    template_id: 'arueuQozNMNHBZ7BQ5hsCzxxC9X38tJ1Kmu7Oa1JjEY',
    url: 'http://weixin.qq.com/download',
    data: {
      first: {
        value: '身份信息',
        color: '#173177'
      },
      keyword1: {
        value: '张三',
        color: '#1d1d1d'
      },
      keyword2: {
        value: '男',
        color: '#1d1d1d'
      },
      keyword3: {
        value: '45',
        color: '#1d1d1d'
      },
      remark: {
        value: '已登记！',
        color: '#173177'
      }
    }
  }
  const res = await wechatApi.sendTemplateMsg({data: requestData, access_token}) //获取access_token成功后调用发送模板消息的方法
  console.log(res)

  ctx.body = res.errmsg === 'ok' ? 'success' : res

}

module.exports = {
  getCode,
  authentication
}
