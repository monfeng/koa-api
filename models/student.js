

const mongoose = require('mongoose')
// 姓名，生日，性别，年龄，紧急联系人，手机，地址，openid， 选择老师，状态：在读，毕业
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
    type: String,
    required: true
  },
  age: {
    type: String,
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
    type: String
  },
  region: {
    type: String
  },
  address: {
    type: String
  },
  openId: {
    type: String
  },
  teacherId: {
    type: String
  },
  status: {
    type: Number,
    required: true
  }
}, { collection: 'student', versionKey: false})



module.exports = mongoose.model('student', userSchema)