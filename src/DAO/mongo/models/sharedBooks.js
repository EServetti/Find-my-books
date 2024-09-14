import { model, Schema, Types } from "mongoose";

const collection = "shared_books";

const schema = new Schema(
  {
    sharedBy: {type: Types.ObjectId, ref: "users", index: true},
    sharedWith: {type: Types.ObjectId, ref: "users", index: true},
    bookId: {type: Types.ObjectId, ref: "books"},
  },
  {
    timestamps: true,
  }
);

const SharedBook = model(collection, schema);
export default SharedBook;
