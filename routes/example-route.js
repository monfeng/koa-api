const Router = require('koa-router')
const router = new Router()
const exampleController = require('../controllers/exapmle-controller')
const common = require('../controllers/common')


router.post('/common', common)
router.post('/post', exampleController.post)

// 错误的路由
router.get('/err', exampleController.err)
router.get('/404', exampleController.nofound)

module.exports = router