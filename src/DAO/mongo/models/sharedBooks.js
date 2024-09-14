import { model, Schema, Types } from "mongoose";

const collection = "shared_books";

const schema = new Schema(
  {
    sharedBy: {type: Types.ObjectId, ref: "users", required: true, index: true},
    sharedWith: {type: Types.ObjectId, ref: "users",required: true, index: true},
    book_id: {type: Types.ObjectId, required: true, ref: "books"},
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("book_id", "title authors publisher publishedDate description infoLink coverImage isbn read")
})

const SharedBook = model(collection, schema);
export default SharedBook;
