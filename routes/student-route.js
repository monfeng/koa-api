const Router = require('koa-router')
const router = new Router({prefix: '/student'})
const Student_col = require('../models/student')
const baseApi = require('../controllers/baseApi')
const Student_Controller = require('../controllers/student-controller')


router.post('/add', Student_Controller.Add)
router.post('/list', async (ctx) => {
  await baseApi.List(ctx, Student_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, Student_col)
})
router.put('/:id', async (ctx) => {
  await baseApi.Update(ctx, Student_col)
})
router.delete('/:id', async (ctx) => {
  await baseApi.Del(ctx, Student_col)
})

module.exports = router