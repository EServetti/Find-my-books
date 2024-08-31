import { getBooks } from "../controllers/controller.api.books.js";
import CustomRouter from "./customRouter.js";

class BooksRouter extends CustomRouter {
    init() {
        this.create("/", ["PUBLIC"], getBooks)
    }
}

const booksRouter = new BooksRouter()
export default booksRouter.getRouter()