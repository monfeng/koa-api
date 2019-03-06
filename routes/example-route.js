const Router = require('koa-router')
const router = new Router()
const exampleController = require('../controllers/exapmle-controller')


router.get('/main', exampleController.main)
router.get('/about', exampleController.about)
router.post('/signin', exampleController.signin)
router.post('/login', exampleController.login)

// 错误的路由
router.get('/err', exampleController.err)
router.get('/404', exampleController.nofound)

module.exports = router