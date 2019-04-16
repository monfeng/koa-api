

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
}, { collection: 'wechat', versionKey: false,  timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }})

module.exports = mongoose.model('wechat', wechatSchema)