import { model, Schema, Types } from "mongoose";

const collection = "shared_books";

const schema = new Schema(
  {
    sharedBy: {type: Types.ObjectId, ref: "users", required: true, index: true},
    sharedWith: {type: Types.ObjectId, ref: "users",required: true, index: true},
    book: {type: Object, required: true, ref: "books"},
  },
  {
    timestamps: true,
  }
);

const SharedBook = model(collection, schema);
export default SharedBook;
