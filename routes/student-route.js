const Router = require('koa-router')
const router = new Router({prefix: '/student'})
const studentController = require('../controllers/student-controller')


router.post('/add', studentController.addStudent)

module.exports = router