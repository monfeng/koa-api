const Router = require('koa-router')
const router = new Router({prefix: '/course'})
const Course_col = require('../models/course')
const baseApi = require('../controllers/baseApi')


router.post('/add', async (ctx) => {
  await baseApi.Add(ctx, Course_col)
})
router.post('/list', async (ctx) => {
  await baseApi.List(ctx, Course_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, Course_col)
})
router.put('/:id', async (ctx) => {
  await baseApi.Update(ctx, Course_col)
})
router.delete('/:id', async (ctx) => {
  await baseApi.Del(ctx, Course_col)
})

module.exports = router