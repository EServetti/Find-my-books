import { getBooks, getOneBook } from "../controllers/controller.api.books.js";
import CustomRouter from "./customRouter.js";
import validator from "../middlewares/joi.validator.js";
import { booksValidate } from "../schemas/books.validator.js";
import { create } from "../controllers/controller.api.books.js";
import bookExists from "../middlewares/bookExists.js";

class BooksRouter extends CustomRouter {
    init() {
        this.create("/", ["PUBLIC"], getBooks)
        this.create("/add", ["USER", "ADMIN"], validator(booksValidate), bookExists, create)
        this.create("/:isbn", ["PUBLIC"], getOneBook)
    }
}

const booksRouter = new BooksRouter()
export default booksRouter.getRouter()