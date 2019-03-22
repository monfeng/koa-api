const Router = require('koa-router')
const router = new Router({prefix: '/student'})
const studentController = require('../controllers/student-controller')


router.post('/add', studentController.addStudent)
router.post('/list', studentController.findStudentList)
router.get('/:id', studentController.findStudent)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.delStudent)

module.exports = router