

const mongoose = require('mongoose')
// 学员的id，课时的数量， 已用的课时， 学费
const Schema = mongoose.Schema
const StudentHour_col = new Schema({
  studentId: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  used: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'student-hour', versionKey: false})



module.exports = mongoose.model('student-hour', StudentHour_col)