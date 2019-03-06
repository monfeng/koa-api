

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const authSchema = new Schema({
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
}, { collection: 'auth', versionKey: false})

module.exports = mongoose.model('auth', authSchema)