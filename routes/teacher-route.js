const Router = require('koa-router')
const Teacher_col = require('../models/teacher')
const baseApi = require('../controllers/baseApi')
const config = require('../config')
const router = new Router({prefix: `${config.prefix}/teacher`})


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