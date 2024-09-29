import { model, Mongoose, Schema, Types } from "mongoose";

const collection = "notifications";

const schema = new Schema(
  {
    type: {
      type: String,
      enum: ["friendRequest", "sharedBook"],
      required: true,
    },
    sender: { type: Types.ObjectId, ref: "users", required: true },
    receiver: { type: Types.ObjectId, ref: "users", required: true },
    sharedBook: { type: Object },
    friendRequest: { type: Types.ObjectId, ref: "friend_requests" },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("sender", "photo name email");
  this.populate("friendRequest", "status _id sender receiver");
});

const Notification = model(collection, schema);
export default Notification;
