import { model, Schema, Types } from "mongoose";

const collection = "books";

const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    title: { type: String, required: true, index: true },
    authors: { type: String, required: true, index: true },
    publisher: { type: String, required: true },
    publishedDate: { type: String, required: true },
    description: { type: String, required: true },
    infoLink: { type: String, required: true },
    coverImage: { type: String, required: true },
    isbn: { type: String, required: true },
    read: { type: Boolean, default: false},
    readPages: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);

const Book = model(collection, schema);
export default Book;
