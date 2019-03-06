

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { collection: 'user', versionKey: false})

module.exports = mongoose.model('user', userSchema)