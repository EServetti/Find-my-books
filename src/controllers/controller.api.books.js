import { getBookDetails } from "../utils/googleBooks.js";
import getBooksFromChatGPT from "../utils/openAI.js";
import axios from "axios";

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
        const {isbn} = req.params
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: `isbn:${isbn}`,
                key: process.env.GOOGLE_BOOKS_SECRET
            }
        });

        const books = response.data.items || [];
        if (books.length > 0) {
            const book = books[0];  
            const isbn = book.volumeInfo.industryIdentifiers
                ? book.volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier || 
                  book.volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_10')?.identifier || 
                  'No ISBN available'
                : 'No ISBN available';

            return res.message200({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || ['Unknown'],
                publisher: book.volumeInfo.publisher || 'Unknown',
                publishedDate: book.volumeInfo.publishedDate || 'Unknown',
                description: book.volumeInfo.description || 'No description available',
                infoLink: book.volumeInfo.infoLink || 'No link available',
                coverImage: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'No image available',
                isbn: isbn 
            });
        } else {
            return res.error404()
        }
    } catch (error) {
        return next(error);
    }
}

export { getBooks, getOneBook };
