
const Course_col = require('../models/course')

/**
 * 增加信息
 * @param {*} ctx 
 */
const BatchCourses = async (ctx) => {
  const body = ctx.request.body
  const { id, courseIds } = body // 学生的id

  try {
    /**
     * update命令
        db.collection.update(criteria,objNew,upsert,multi)
        参数说明：
        criteria：查询条件
        objNew：update对象和一些更新操作符
        upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入。
        multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新。
        更新学时统计表
        db.getCollection('course').update
            (
                { $or: [{ _id: ObjectId("5cac27dd41977e40a39132af") }, { _id: ObjectId("5cac37ce41977e40a39132b0") }] },
                { $addToSet: { studentIds: "camera" } },
                { multi: true }
            )
     */
    

    const courseQuery = courseIds.map(key => ({
      _id: key
    }))

    const query = {
      $or: courseQuery
    }

    const update = await Course_col.update(
      query,
      { $addToSet: { studentIds: id } },
      { upsert: false, multi: true })


    // 更新课程表成功 : update.n更新的条数
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'update success',
      data: update,
      desc: '更新成功'
    }


  } catch (error) {
    ctx.status = 400
    ctx.body = {
      code: 0,
      msg: error,
      desc: '更新失败'
    }
  }
}



module.exports = {
  BatchCourses,
}