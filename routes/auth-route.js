const Router = require('koa-router')
const authController = require('../controllers/auth-controller')
const config = require('../config')
const router = new Router({prefix: `${config.prefix}/auth`})

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router