const Router = require('koa-router')
const router = new Router({prefix: '/student'})
const studentController = require('../controllers/student-controller')


router.post('/add', studentController.addStudent)
router.post('/list', studentController.findStudentList)
router.get('/detail/:id', studentController.findStudent)
router.put('/detail/:id', studentController.updateStudent)

module.exports = router