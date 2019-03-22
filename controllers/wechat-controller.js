// Nodejs + express 开发微信公众号模板消息推送功能： https://blog.csdn.net/lihefei_coder/article/details/81907638

// nodejs实现微信公众号基本事件推回复：https://www.jianshu.com/p/f96b9169eec4

// koa的基本回复：https://www.jb51.net/article/140296.htm

// 内网工具：natapp.cn/login 按照教程下载客户端进行配置

// openid oVB5OwyVDKfTZq4T61_p2roSg1tA

// 微信配置是get请求，完成一次后，以后的东西都发到对于的post里面去

const crypto = require('crypto') //引入加密模块
const config = require('../config/wechat') //引入配置文件
const getRawBody = require('raw-body')
const parseXML = require('../utils/xml')

const sign = async ctx => {
  console.log(ctx.query)
  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  const { signature, timestamp, nonce, echostr } = ctx.query
  // signature, //微信加密签名
  // timestamp, //时间戳
  // nonce, //随机数
  // echostr; //随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  const array = [config.token, timestamp, nonce]
  array.sort()

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  const tempStr = array.join('')
  const hashCode = crypto.createHash('sha1') //创建加密类型
  const resultCode = hashCode.update(tempStr, 'utf8').digest('hex') //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
    ctx.body = echostr
  } else {
    ctx.body = `验证不成功, resultCode:${resultCode}, echostr:${echostr}`
  }
}

// 处理微信消息
const handleMsg = async ctx => {
  console.log('有东西来了')
  // TODO
  // 取原始数据
  const xml = await getRawBody(ctx.req, {
    length: ctx.request.length,
    limit: '1mb',
    encoding: ctx.request.charset || 'utf-8'
  })
  console.log(xml)
  const formatted = await parseXML(xml)
  console.log(formatted)
  // ctx.body = 'success' // 一定要success，否则报错
  ctx.type = 'application/xml'
  return (ctx.body = `<xml> 
  <ToUserName><![CDATA[${formatted.FromUserName}]]></ToUserName> 
  <FromUserName><![CDATA[${formatted.ToUserName}]]></FromUserName> 
  <CreateTime>${new Date().getTime()}</CreateTime> 
  <MsgType><![CDATA[text]]></MsgType> 
  <Content><![CDATA[这儿是JavaScript之禅,老子是nodejs的后台啊]]></Content> 
  </xml>`)
}

module.exports = {
  sign,
  handleMsg
}
