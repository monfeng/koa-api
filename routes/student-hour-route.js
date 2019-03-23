const Router = require('koa-router')
const router = new Router({prefix: '/student-hour'})
const StudentHour_col = require('../models/student-hour')
const baseApi = require('../controllers/baseApi')


router.post('/list', async (ctx) => {
  await baseApi.List(ctx, StudentHour_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, StudentHour_col)
})

module.exports = router