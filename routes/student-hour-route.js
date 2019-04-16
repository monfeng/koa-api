const Router = require('koa-router')
const StudentHour_col = require('../models/student-hour')
const baseApi = require('../controllers/baseApi')
const config = require('../config')
const router = new Router({prefix: `${config.prefix}/student-hour`})


router.post('/list', async (ctx) => {
  await baseApi.List(ctx, StudentHour_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, StudentHour_col, 'studentId')
})

module.exports = router