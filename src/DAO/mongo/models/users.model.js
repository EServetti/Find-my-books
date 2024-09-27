import { model, Schema, Types } from "mongoose";

const collection =  "users"

const schema = new Schema ({
  name: {type: String, required: true, index: true},
  photo: {type: String, default: "/img/defaultUser.webp"},
  email: {type: String, required: true, unique: true, index: true},
  password:{type: String, required: true},
  role: {type: String, default: "user"},
  friends: [{ type: Types.ObjectId, ref: 'users' }], 
  verify: {type: Boolean, default: false},
  verifyCode: {type: String, required: true},
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Number}
},
{
  timestamps: true
});

const User = model(collection, schema);
export default User