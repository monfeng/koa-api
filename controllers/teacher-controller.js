const Teacher_col = require('../models/teacher')


/**
 * 添加新的老师
 * @param {*} ctx 
 */
const addTeacher = async (ctx) => {
  const body = ctx.request.body
  // const {name, birthday, sex, age, contacts, phone, province, city, region, address, status} = body
  
  try {
    await Teacher_col.create(body)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'insert success',
      desc: '添加老师成功'
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '添加老师失败'
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
 * 获取老师的列表
 */

const findTeacherList = async (ctx) => {
  const body = ctx.request.body
  const {page = 1, limit = 10, query = {}} = body

  try {
    const offset = (page - 1) * limit
    const teacher = await Teacher_col.find(query).skip(offset).limit(limit)
    const count = await Teacher_col.estimatedDocumentCount()
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: teacher,
      count
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询老师列表失败'
    }
  }
}

/**
 * 获取老师的详情
 */

const findTeacher = async (ctx) => {
  const {id} = ctx.params
  try {
    const teacher = await Teacher_col.findById(id)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: teacher,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询老师失败'
    }
  }
}


/**
 * 更改老师的信息
 * new：bool - true返回修改后的文档而不是原始文档。默认为false
  upsert：bool - 如果对象不存在，则创建该对象。默认为false。
  runValidators：如果为true，则在此命令上运行update validators。更新验证程序根据模型的架构验证更新操作。
  setDefaultsOnInsert：如果这upsert是真的，如果创建了新文档，mongoose将应用模型模式中指定的默认值。此选项仅适用于MongoDB> = 2.4，因为它依赖于MongoDB的$setOnInsert运算符。
  sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
  select：设置要返回的文档字段
  rawResult：如果为true，则返回MongoDB驱动程序的原始结果
  strict：覆盖此更新的架构严格模式选项
 */

const updateTeacher = async (ctx) => {
  const {id} = ctx.params
  const body = ctx.request.body
  body.updateDate = new Date
  try {
    const teacher = await Teacher_col.findOneAndReplace({_id: id}, { $set: body})
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'update success',
      data: teacher,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '修改老师失败'
    }
  }
}


/**
 * 删除老师
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
  select：设置要返回的文档字段
  rawResult：如果为true，则返回MongoDB驱动程序的原始结果
  strict：覆盖此更新的架构严格模式选项
 */

const delTeacher = async (ctx) => {
  const {id} = ctx.params
  try {
    const teacher = await Teacher_col.findOneAndDelete({_id: id}) // executes;
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'delete success',
      data: teacher,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '删除老师失败'
    }
  }
}
 
module.exports = {
  addTeacher,
  findTeacherList,
  findTeacher,
  updateTeacher,
  delTeacher
}