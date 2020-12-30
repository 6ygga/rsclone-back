const { Schema, model } = require('mongoose')

const userScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  preference: {
    type: String,
    default: null
  }
})
module.exports = model('User', userScheme)
