const Router = require('koa-router')
const Course_col = require('../models/course')
const baseApi = require('../controllers/baseApi')
const config = require('../config')
const router = new Router({prefix: `${config.prefix}/course`})


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