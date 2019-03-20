const Router = require('koa-router')
const router = new Router()
const wechatController = require('../controllers/wechat-controller')

// 错误的路由
router.get('/wechat', wechatController.sign)
router.post('/wechat', wechatController.handleMsg)

module.exports = router