const { Schema, model } = require('mongoose');

const userDataScheme = new Schema({
  name: {
    type: String,
    default: null
  }
});
module.exports = model('UserData', userDataScheme);
