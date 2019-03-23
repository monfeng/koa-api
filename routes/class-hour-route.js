const Router = require('koa-router')
const router = new Router({prefix: '/class-hour'})
const ClassHour_col = require('../models/class-hour')
const baseApi = require('../controllers/baseApi')
const ClassHour_Controller = require('../controllers/class-hour-controller')


router.post('/add', ClassHour_Controller.Add)
router.post('/list', async (ctx) => {
  await baseApi.List(ctx, ClassHour_col)
})
router.get('/:id', async (ctx) => {
  await baseApi.Detail(ctx, ClassHour_col)
})
// router.put('/:id', async (ctx) => {
//   await baseApi.Update(ctx, ClassHour_col)
// })
// router.delete('/:id', async (ctx) => {
//   await baseApi.Del(ctx, ClassHour_col)
// })

module.exports = router