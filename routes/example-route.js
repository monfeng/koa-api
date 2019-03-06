const Router = require('koa-router')
const router = new Router()
const exampleController = require('../controllers/exapmle-controller')


router.get('/main', exampleController.main)
router.get('/about', exampleController.about)
router.post('/signin', exampleController.signin)

module.exports = router