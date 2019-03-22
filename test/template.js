const config = require('../config/wechat') //引入配置文件
const request = require('request')
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

function getCode (ctx) {

  const {code} = ctx.query //微信回调这个接口后会把code参数带过来
  getOpenId(code) //把code传入getOpenId方法

}


/**
* 获取openid
* @param  { string } code [调用获取openid的接口需要code参数]
*/
function getOpenId(code) {
  const appid = config.appID
  const secret = config.appSecret

  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`

  request(url, function(error, response, body) {
    // {"access_token":"19_hzqHX1vkLgmC4rSZcQH1JKViDgk8PDUFbJOtDxbmXRl2W6se5OD-7-PtUQuZ8LGP1eeD2hAFE-s_rHNsMvpiqg","expires_in":7200,"refresh_token":"19_sBvFi4mr1WDxNv1W9IEeOesYbgEPM-zPVGF4hJwVzPsOC_7kqTZ0tAcxem_ePktDfznFBrcyizVXAfcGe5yLUA","openid":"oVB5OwyVDKfTZq4T61_p2roSg1tA","scope":"snsapi_base"}
    if (!error && response.statusCode == 200) {
      console.log(typeof body)
      console.log(body)
      body = JSON.parse(body)
      console.log(typeof body)
      const openid =  body.openid
      console.log(openid)
      getAccessToken(openid)   //获取openid成功后调用getAccessToken
      // const access_token= body.access_token
      // sendTemplateMsg(openid, access_token) //获取access_token成功后调用发送模板消息的方法
    }

  })
}


/**
* 获取access_token
*  @param  { string } openid [发送模板消息的接口需要用到openid参数]
*/
function getAccessToken(openid) {
  const appid = config.appID
  const secret = config.appSecret
  const grant_type = config.grant_type

  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`

  request(url, function(error, response, body) {

    if (!error && response.statusCode == 200) {

      const access_token= JSON.parse(body).access_token
      sendTemplateMsg(openid, access_token) //获取access_token成功后调用发送模板消息的方法

    } else {
      throw 'update access_token error'
    }
  })


}


/**
* 发送模板消息
* @param  { string } openid [发送模板消息的接口需要用到openid参数]
* @param  { string } access_token [发送模板消息的接口需要用到access_token参数]
*/

function sendTemplateMsg(openid, access_token) {

  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}` //发送模板消息的接口
  console.log(access_token)
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

  console.log(requestData)

  request({
    url: url,
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'application/json',
    },
    body: requestData,
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // {errcode: 0, errmsg: "ok", msgid: 731267919140847600}
      console.log('模板消息推送成功') 
    }
    console.log(body)
    console.log(error)
  })

}

module.exports = {
  getCode,
  authentication
}
