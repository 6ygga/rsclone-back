const { Schema, model } = require('mongoose')

const userDataScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: null
  }
})
module.exports = model('UserData', userDataScheme)
