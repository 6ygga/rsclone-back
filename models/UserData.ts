import {model, Schema} from "mongoose";

const userDataScheme = new Schema({
  user: String,
  data: {
    type: String,
    default: null
  }
});
export default model('UserData', userDataScheme);
