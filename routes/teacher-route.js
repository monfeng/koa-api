const Router = require('koa-router')
const router = new Router({prefix: '/teacher'})
const Teacher_col = require('../models/teacher')
const baseApi = require('../controllers/baseApi')


router.post('/add', async (ctx) => {
  await baseApi.Add(ctx, Teacher_col)
})
router.post('/list', async (ctx) => {
  await baseApi.List(ctx, Teacher_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, Teacher_col)
})
router.put('/:id', async (ctx) => {
  await baseApi.Update(ctx, Teacher_col)
})
router.delete('/:id', async (ctx) => {
  await baseApi.Del(ctx, Teacher_col)
})

module.exports = router