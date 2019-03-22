const Router = require('koa-router')
const router = new Router()
const exampleController = require('../controllers/exapmle-controller')


router.get('/get', exampleController.get)
router.post('/post', exampleController.post)

// 错误的路由
router.get('/err', exampleController.err)
router.get('/404', exampleController.nofound)

module.exports = router