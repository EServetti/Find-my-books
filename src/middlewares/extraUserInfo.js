import { readService } from "../service/books.service.js";
import { readOneService } from "../service/users.service.js";
import {readService as readSharedService } from "../service/shared.service.js"

async function extraUserInfo(req, res, next) {
  try {
    const { _id } = req.body;
    const one = await readOneService(_id)
    const all = await readService({ user_id: _id });
    const booksQuantity = all.length;
    let readBooks = all.filter((b) => b.read === true)
    readBooks = readBooks.length
    const friendsQuantity = one.friends.length
    let sharedBooks = await readSharedService({sharedBy: _id})
    sharedBooks = sharedBooks.length
    req.body.sharedBooks = sharedBooks
    req.body.friendsQuantity = friendsQuantity
    req.body.booksQuantity = booksQuantity;
    req.body.books = all
    req.body.readBooks = readBooks;
    return next();
  } catch (error) {
    return next(error);
  }
}

export default extraUserInfo;
