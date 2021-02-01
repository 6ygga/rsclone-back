const { Schema, model } = require('mongoose');

const userDataSchemeM = new Schema({
  user: String,
  data: {
    type: String,
    default: null
  }
});
module.exports = model('UserDataM', userDataSchemeM);
