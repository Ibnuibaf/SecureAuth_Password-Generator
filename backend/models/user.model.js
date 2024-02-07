import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwords: [
    {
      label:String,
      pass:String,
    },
  ],
  block:{
    type:Boolean,
    default:false
  }
});

const UserModel=mongoose.model("User",UserSchema)

export default UserModel