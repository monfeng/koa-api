

const mongoose = require('mongoose')
// 姓名，生日，性别：男/女=》1/2，年龄，手机， 地址，状态：在职，离职 1/2，备注：‘’, 创建时间，更新时间
const Schema = mongoose.Schema
const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  sex: {
    type: Number,
    default: 1,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  region: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 1,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
}, { collection: 'teacher', versionKey: false})



module.exports = mongoose.model('teacher', teacherSchema)