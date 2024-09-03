import { getBookDetails } from "../utils/googleBooks.js";
import getBooksFromChatGPT from "../utils/openAI.js";

async function getBooks(req, res, next) {
    try {
        const { description } = req.body;
        let bookTitles = await getBooksFromChatGPT(description);
        const bookDetailsPromises = bookTitles.map((title) => getBookDetails(title));
        
        const books = await Promise.all(bookDetailsPromises);
        const flattenedBooks = books.flat();

        if(flattenedBooks.length === 0) {
            return res.error404()
        }

        return res.message200(flattenedBooks);
    } catch (error) {
        return next(error);
    }
}

async function getOneBook(req, res, next) {
    try {
        const { title } = req.params;
        let book = await getBookDetails(title);
        book = book[0]
        return res.message200(book);
    } catch (error) {
        return next(error);
    }
}

export { getBooks, getOneBook };
