import { getBooks, getOneBook } from "../controllers/controller.api.books.js";
import CustomRouter from "./customRouter.js";

class BooksRouter extends CustomRouter {
    init() {
        this.create("/", ["PUBLIC"], getBooks)
        this.create("/:isbn", ["PUBLIC"], getOneBook)
    }
}

const booksRouter = new BooksRouter()
export default booksRouter.getRouter()