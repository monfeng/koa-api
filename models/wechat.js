

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const wechatSchema = new Schema({
  name: {
    type: String,
    default: 'wechat_token'
  },
  access_token: {
    type: String,
    required: true
  },
  expires_in: {
    type: Number,
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
}, { collection: 'wechat', versionKey: false})

module.exports = mongoose.model('wechat', wechatSchema)