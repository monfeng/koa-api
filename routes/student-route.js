const Router = require('koa-router')
const router = new Router({prefix: '/student'})
const Student_col = require('../models/student')
const baseApi = require('../controllers/baseApi')


router.post('/add', async (ctx) => {
  await baseApi.Add(ctx, Student_col)
})
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