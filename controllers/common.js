
module.exports = async function (ctx) {
  try {
    const {collection, aggregate} = ctx.request.body
    const Col = require(`../models/${collection}`)
    const data = await Col.aggregate(aggregate)

    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: data,
      desc: '获取成功'
    }


  } catch (error) {
    console.log(error)
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '获取失败'
    }
  }
}