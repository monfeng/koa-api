

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const exampleSchema = new Schema({
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
}, { collection: 'example', versionKey: false,  timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }})

module.exports = mongoose.model('example', exampleSchema)