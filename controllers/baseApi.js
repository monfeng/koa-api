
/**
 * 增加信息
 * @param {*} ctx 
 * @param {*} Document_Model 字段表model
 */
const Add = async (ctx, Document_Model) => {
  const body = ctx.request.body
  
  try {
    await Document_Model.create(body)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'insert success',
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
 * 获取的列表
 * @param {*} ctx 
 * @param {*} Document_Model 字段表model
 */

const List = async (ctx, Document_Model) => {
  const body = ctx.request.body
  const {page = 1, limit = 10, query = {}, sort = {}} = body

  try {
    const offset = (page - 1) * limit
    const data = await Document_Model.find(query).sort(sort).skip(offset).limit(limit)
    const count = await Document_Model.estimatedDocumentCount()
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: data,
      count
    }
  } catch (error) {
    console.log(error)
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询列表失败'
    }
  }
}

/**
 * @param {*} ctx 
 * 获取的详情
 */

const Detail = async (ctx, Document_Model) => {
  const {id} = ctx.params
  try {
    const data = await Document_Model.findById(id)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data: data,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '查询失败'
    }
  }
}


/**
 * 更改的信息
 * @param {*} ctx 
 * new：bool - true返回修改后的文档而不是原始文档。默认为false
  upsert：bool - 如果对象不存在，则创建该对象。默认为false。
  runValidators：如果为true，则在此命令上运行update validators。更新验证程序根据模型的架构验证更新操作。
  setDefaultsOnInsert：如果这upsert是真的，如果创建了新文档，mongoose将应用模型模式中指定的默认值。此选项仅适用于MongoDB> = 2.4，因为它依赖于MongoDB的$setOnInsert运算符。
  sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
  select：设置要返回的文档字段
  rawResult：如果为true，则返回MongoDB驱动程序的原始结果
  strict：覆盖此更新的架构严格模式选项
 */

const Update = async (ctx, Document_Model) => {
  const {id} = ctx.params
  const body = ctx.request.body
  body.updateDate = new Date
  try {
    const data = await Document_Model.findOneAndReplace({_id: id}, { $set: body})
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'update success',
      data: data,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '修改失败'
    }
  }
}


/**
 * 删除
 * @param {*} ctx 
 * sort：如果条件找到多个文档，请设置排序顺序以选择要更新的文档
  select：设置要返回的文档字段
  rawResult：如果为true，则返回MongoDB驱动程序的原始结果
  strict：覆盖此更新的架构严格模式选项
 */

const Del = async (ctx, Document_Model) => {
  const {id} = ctx.params
  try {
    const data = await Document_Model.findOneAndDelete({_id: id}) // executes;
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'delete success',
      data: data,
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '删除失败'
    }
  }
}
 
module.exports = {
  Add,
  List,
  Detail,
  Update,
  Del
}