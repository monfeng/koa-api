

const mongoose = require('mongoose')
// 姓名，生日，性别：男/女=》1/2，年龄，紧急联系人，手机，地址，openid， 选择老师，状态：在读，毕业 1/2
const Schema = mongoose.Schema
const userSchema = new Schema({
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
  contacts: {
    type: String,
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
  openId: {
    type: String,
    default: ''
  },
  teacherId: {
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
  }
}, { collection: 'student', versionKey: false})



module.exports = mongoose.model('student', userSchema)