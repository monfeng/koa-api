

const mongoose = require('mongoose')
// status 管理员1， 非管理员2
const Schema = mongoose.Schema
const authSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1,
    required: true
  },
}, { collection: 'auth', versionKey: false,  timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }})

module.exports = mongoose.model('auth', authSchema)