const Router = require('koa-router')
const router = new Router({prefix: '/auth'})
const authController = require('../controllers/auth-controller')


router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router