const Student_col = require('../models/student');


/**
 * 添加新的学员
 * @param {*} ctx 
 */
const addStudent = async (ctx) => {
  const body = ctx.request.body
  const {name, birthday, sex, age, contacts, phone, province, city, region, address, teacherId, status} = body
  
  try {
    await Student_col.create({name, birthday, sex, age, contacts, phone, province, city, region, address, teacherId, status});
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'insert success',
      desc: '添加学员成功'
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '添加学员失败'
    }
  }
  
  
}



module.exports = {
  addStudent,
}