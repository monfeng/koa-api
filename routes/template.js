const Router = require('koa-router')
const router = new Router()
const templateController = require('../controllers/template-controller')

// 错误的路由
router.get('/authentication', templateController.authentication)
router.get('/code', templateController.getCode)

module.exports = router