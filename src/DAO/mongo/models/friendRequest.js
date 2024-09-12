import { model, Schema, Types } from "mongoose";

const collection = "friend_requests";

const schema = new Schema(
  {
    sender: {type: Types.ObjectId, ref: "users", required: true },
    receiver: {type: Types.ObjectId, ref: "users", required: true },
    status: {type: String, enum: ["pending", "accepted", "rejected"], default: "pending"},
  },
  {
    timestamps: true,
  }
);

const FriendRequest = model(collection, schema);
export default FriendRequest;
