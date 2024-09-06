import { readService } from "../service/books.service.js";

async function extraUserInfo(req, res, next) {
  try {
    const { _id } = req.body;
    const all = await readService({ user_id: _id });
    const booksQuantity = all.length;
    let readBooks = all.filter((b) => b.read === true)
    readBooks = readBooks.length
    req.body.booksQuantity = booksQuantity;
    req.body.books = all
    req.body.readBooks = readBooks;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default extraUserInfo;
