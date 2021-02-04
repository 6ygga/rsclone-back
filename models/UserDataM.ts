import {model, Schema} from "mongoose";

const userDataSchemeM = new Schema({
  user: String,
  data: {
    type: String,
    default: null
  }
});
export default model('UserDataM', userDataSchemeM);
