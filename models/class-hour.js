

const mongoose = require('mongoose')
// 家长姓名，学员的id，课时的数量， 状态：通过1/2， 类型：添加/减少 1/2， 金钱, 学时的类型：购买/赠送1//2, 课时/教师的名称和id
const Schema = mongoose.Schema
const ClassHour_col = new Schema({
  name: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  course: {
    type: Schema.Types.Mixed,
    default: () => {
      return {
        name: '',
        id: '',
        teacherId: '',
        teacherName: ''
      }
    } 
  },
  studentId: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  classTypes: {
    type: Number,
    default: 1
  },
  amount: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'classHour', versionKey: false})



module.exports = mongoose.model('classHour', ClassHour_col)