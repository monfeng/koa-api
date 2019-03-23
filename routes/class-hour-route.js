const Router = require('koa-router')
const router = new Router({prefix: '/class-hour'})
const ClassHour_col = require('../models/class-hour')
const baseApi = require('../controllers/baseApi')


router.post('/add', async (ctx) => {
  await baseApi.Add(ctx, ClassHour_col)
})
router.post('/list', async (ctx) => {
  await baseApi.List(ctx, ClassHour_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, ClassHour_col)
})
router.put('/:id', async (ctx) => {
  await baseApi.Update(ctx, ClassHour_col)
})
router.delete('/:id', async (ctx) => {
  await baseApi.Del(ctx, ClassHour_col)
})

module.exports = router