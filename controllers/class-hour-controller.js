
const ClassHour_col = require('../models/class-hour')
const StudentHour_col = require('../models/student-hour')

/**
 * 增加信息
 * @param {*} ctx 
 */
const Add = async (ctx) => {
  const body = ctx.request.body
  
  try {
    // $inc在原基础上更改：https://docs.mongodb.com/manual/reference/operator/update/inc/#up._S_inchttps://docs.mongodb.com/manual/reference/operator/update/inc/#up._S_inc
    
    // 更新学时统计表
    const {type, num} = body
    const query = type === 1 ? {$inc: { num }} : {$inc: { used: num }}

    const update = await StudentHour_col.update({studentId: body.studentId}, query, {upsert: false, multi: false})

    const data = {
      student_hour: update
    }

    // 如果学时表更新成功，则添加流水
    if (update && update.n !== 0) {
      data.class_hour = await ClassHour_col.create(body)
    }

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