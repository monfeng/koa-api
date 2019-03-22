const Router = require('koa-router')
const router = new Router({prefix: '/teacher'})
const teacherController = require('../controllers/teacher-controller')


router.post('/add', teacherController.addTeacher)
router.post('/list', teacherController.findTeacherList)
router.get('/:id', teacherController.findTeacher)
router.put('/:id', teacherController.updateTeacher)
router.delete('/:id', teacherController.delTeacher)

module.exports = router