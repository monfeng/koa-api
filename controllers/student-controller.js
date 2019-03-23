
const Student_col = require('../models/student')
const StudentHour_col = require('../models/student-hour')

/**
 * 增加信息
 * @param {*} ctx 
 */
const Add = async (ctx) => {
  const body = ctx.request.body
  
  try {
    const data = await Student_col.create(body)
    const insertParmas = {
      studentId: data._id,
      num: 0, // 学时
      used: 0, // 剩余学时
    }
    // 新建学时统计表
    await StudentHour_col.create(insertParmas)

    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'insert success',
      data,
      desc: '添加成功'
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '添加失败'
    }
  }
}


 
module.exports = {
  Add,
}