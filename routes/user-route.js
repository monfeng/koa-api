const Router = require('koa-router')
const userController = require('../controllers/user-controller')
const config = require('../config')
const router = new Router({prefix: `${config.prefix}/user`})

router.get('/userInfo', userController.fetchUserInfo)

module.exports = router