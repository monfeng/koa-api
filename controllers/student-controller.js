
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

/**
 * 根据创建时间统计学生的个数
 * @param {*} ctx 
 */
const caculateStudentByMonth = async (ctx) => {
  
  try {
    const body = ctx.request.body
    const { query } = body


    const poline = [
      {
        $group: {
        // _id : { $dateToString: { format: "%Y-%m-%d", date: "$createDate" } },
          _id: { $dateToString: { format: '%Y-%m', date: '$createDate' } },
          key: { $first: {  $month: '$createDate'} },
          students: {
            $push: {
              teacherId: '$teacherId',
              name: '$name',
              id: '$_id'
            }
          },
          count: { $sum: 1 }
        }
      }
    ]

    if (query) {
      const {
        teacherId,
        createDate
      } = query

      const match = {
        $match: {
        }
      }

      if (teacherId) {
        match.$match.teacherId = teacherId
      }

      if (createDate) {
        match.$match.createDate = {
          $gte: new Date(Number(createDate),1,1, 0, 0, 0),
          $lte: new Date(Number(createDate),12,31, 23, 59, 59)
        }
      }

      poline.unshift(match)
    }

    console.log(poline)



    const data = await Student_col.aggregate(poline)
    // const data = await Student_col.aggregate([{
    //   $match: {
    //     createDate: {
    //       $gte: new Date(2019,1,1)
    //     }
    //   }
    // }])
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data,
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


/**
 * 统计学生的就读和毕业人数
 * @param {*} ctx 
 */
const caculateStudentNumber = async (ctx) => {
  
  try {
    const body = ctx.request.body
    const { query } = body


    const poline = [
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]

    if (query) {
      const {
        teacherId,
        createDate
      } = query

      const match = {
        $match: {
        }
      }

      if (teacherId) {
        match.$match.teacherId = teacherId
      }

      if (createDate) {
        match.$match.createDate = {
          $gte: new Date(Number(createDate),1,1, 0, 0, 0),
          $lte: new Date(Number(createDate),12,31, 23, 59, 59)
        }
      }

      poline.unshift(match)
    }

    console.log(poline)



    const data = await Student_col.aggregate(poline)
    ctx.status = 200
    ctx.body = {
      code: 1,
      msg: 'find success',
      data,
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



module.exports = {
  Add,
  caculateStudentByMonth,
  caculateStudentNumber
}