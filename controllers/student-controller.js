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


// {
//   page: 1,
//   limit: 10,
//   query: {
//     name: {
//       $eq: '111'
//     }
//   }
// }

/**
 * 获取学员的列表
 */

 const findStudentList = async (ctx) => {
  const body = ctx.request.body
  const {page = 0, limit = 10, query = {}} = body

  try {
    const students = await Student_col.find(query, { _id: 1 }).skip(page).limit(limit);
    const count = await Student_col.count()
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: students,
      count
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询学员失败'
    }
  }
 }

 /**
 * 获取学员的详情
 */

const findStudent = async (ctx) => {
  const {id} = ctx.params
  try {
    const students = await Student_col.findById(id);
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: students,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询学员失败'
    }
  }
 }


/**
 * 更改学员的信息
 * new：bool - true返回修改后的文档而不是原始文档。默认为false
  upsert：bool - 如果对象不存在，则创建该对象。默认为false。
  runValidators：如果为true，则在此命令上运行update validators。更新验证程序根据模型的架构验证更新操作。
  setDefaultsOnInsert：如果这upsert是真的，如果创建了新文档，mongoose将应用模型模式中指定的默认值。此选项仅适用于MongoDB> = 2.4，因为它依赖于MongoDB的$setOnInsert运算符。
  sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
  select：设置要返回的文档字段
  rawResult：如果为true，则返回MongoDB驱动程序的原始结果
  strict：覆盖此更新的架构严格模式选项
 */

const updateStudent = async (ctx) => {
  const {id} = ctx.params
  const body = ctx.request.body
  try {
    const students = await Student_col.findByIdAndUpdate(id, { $set: body}, {new: true});
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: students,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询学员失败'
    }
  }
 }
 
module.exports = {
  addStudent,
  findStudentList,
  findStudent,
  updateStudent
}