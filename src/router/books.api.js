import { getBooks, getOneBook, create, destroy, update, shared, share, getRecommendedBooks } from "../controllers/controller.api.books.js";
import CustomRouter from "./customRouter.js";
import validator from "../middlewares/joi.validator.js";
import { booksValidate } from "../schemas/books.validator.js";
import bookExists from "../middlewares/bookExists.js";
import {sharedValidate} from "../schemas/sharedBooks.js"
import bookShared from "../middlewares/bookShared.js";

class BooksRouter extends CustomRouter {
    init() {
        this.read("/recommended", ["USER", "ADMIN"], getRecommendedBooks)
        this.create("/", ["PUBLIC"], getBooks)
        this.create("/add", ["USER", "ADMIN"], validator(booksValidate), bookExists, create)
        this.create("/share", ["USER", "ADMIN"], validator(sharedValidate), bookShared, share)
        this.create("/:isbn", ["PUBLIC"], getOneBook)
        this.update("/:id", ["USER", "ADMIN"], update)
        this.destroy("/:id", ["USER", "ADMIN"], destroy)
        this.read("/shared/:id", ["USER", "ADMIN"], shared)
    }
}

const booksRouter = new BooksRouter()
export default booksRouter.getRouter()