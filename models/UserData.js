const { Schema, model } = require('mongoose');

const userDataScheme = new Schema({
  user: String,
  data: {
    type: String,
    default: null
  }
});
module.exports = model('UserData', userDataScheme);
