const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const userController = require('../controllers/user-controller')


router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router