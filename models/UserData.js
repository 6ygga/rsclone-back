const { Schema, model } = require('mongoose')

const userDataScheme = new Schema({
  token: {
    type: String,
    default: null
  }
})
module.exports = model('UserData', userDataScheme)
