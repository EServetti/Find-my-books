import { model, Schema } from "mongoose";

const collection =  "users"

const schema = new Schema ({
  name: {type: String, required: true, index: true},
  photo: {type: String, default: "/img/defaultUser.webp"},
  email: {type: String, required: true, unique: true, index: true},
  password:{type: String, required: true},
  role: {type: String, default: "user"},
  verify: {type: Boolean, default: false},
  verifyCode: {type: String, required: true},
},
{
  timestamps: true
});

const User = model(collection, schema);
export default User