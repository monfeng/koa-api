const config = require('../config/wechat') //引入配置文件
const request = require('request')

/**
 * 获取openid
 * @param  { string } code [调用获取openid的接口需要code参数]
 * @return { object } {"access_token":"19_zSeQOVywxOGrOmddJNn7H-347BgCk8VKqvB2xgnHNxzTePDedlz9zTWxTTCr7lmqEjmkHlFib8CMniVdGicbaw","expires_in":7200,"refresh_token":"19_4YhFr5l4qDaqDSeuErhaxPP-7dqOM2t5jiOhBl3eaZsPu7acxIqsxuDJfyc9_7wccJr6aqq5R73k6k5XCA2nFA","openid":"oVB5OwyVDKfTZq4T61_p2roSg1tA","scope":"snsapi_base"}
 */
function getOpenId(code) {
  const appid = config.appID
  const secret = config.appSecret

  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          body = typeof body === 'string' ? JSON.parse(body) : body
          resolve(body)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(error)
      }
    })
  })
}

/**
 * 获取access_token
 */
function getAccessToken () {

  const appid = config.appID
  const secret = config.appSecret
  const grant_type = config.grant_type
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          body = typeof body === 'string' ? JSON.parse(body) : body
          resolve(body)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(error)
      }
    })
  })
}


/**
* 发送模板消息
* @param  { string } openid [发送模板消息的接口需要用到openid参数]
* @param  { string } access_token [发送模板消息的接口需要用到access_token参数]
  // {errcode: 0, errmsg: "ok", msgid: 731267919140847600}
*/

function sendTemplateMsg ({access_token, data}) {
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}` //发送模板消息的接口
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: 'POST',
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: data,
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          body = typeof body === 'string' ? JSON.parse(body) : body
          resolve(body)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(error)
      }
    })
  })

}

module.exports = {
  getOpenId,
  getAccessToken,
  sendTemplateMsg
}
