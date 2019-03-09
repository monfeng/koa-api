const Router = require('koa-router')
const router = new Router({prefix: '/v1/auth'})
const authController = require('../controllers/auth-controller')


router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router