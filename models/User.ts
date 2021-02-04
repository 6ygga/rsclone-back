import {model, Schema} from "mongoose";


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
export default model('User', userScheme)
