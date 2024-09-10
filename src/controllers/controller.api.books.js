import { createService, destroyService, updateService } from "../service/books.service.js";
import { getBookDetails } from "../utils/googleBooks.js";
import getBooksFromChatGPT, {
  getRelatedBooksFromChatGPT,
} from "../utils/openAI.js";
import axios from "axios";

async function getBooks(req, res, next) {
  try {
    const { description } = req.body;
    let bookTitles = await getBooksFromChatGPT(description);
    const bookDetailsPromises = bookTitles.map((title) =>
      getBookDetails(title)
    );

    const books = await Promise.all(bookDetailsPromises);
    const flattenedBooks = books.flat();

    if (flattenedBooks.length === 0) {
      return res.error404();
    }

    return res.message200(flattenedBooks);
  } catch (error) {
    return next(error);
  }
}

async function getOneBook(req, res, next) {
  try {
    const { isbn } = req.params;
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `isbn:${isbn}`,
          key: process.env.GOOGLE_BOOKS_SECRET,
        },
      }
    );

    const books = response.data.items || [];
    if (books.length > 0) {
      const book = books[0];
      //Agregar libros relacionados
      const titleRelatedBooks = await getRelatedBooksFromChatGPT(
        book.volumeInfo.title
      );
      let relatedBooks = titleRelatedBooks.map((title) =>
        getBookDetails(title)
      );
      relatedBooks = await Promise.all(relatedBooks);
      relatedBooks = relatedBooks.flat();
      relatedBooks = relatedBooks.slice(0, 3);

      const isbn = book.volumeInfo.industryIdentifiers
        ? book.volumeInfo.industryIdentifiers.find(
            (id) => id.type === "ISBN_13"
          )?.identifier ||
          book.volumeInfo.industryIdentifiers.find(
            (id) => id.type === "ISBN_10"
          )?.identifier ||
          "No ISBN available"
        : "No ISBN available";


      return res.json({
        statusCode: 200,
        message: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || ["Unknown"],
          publisher: book.volumeInfo.publisher || "Unknown",
          publishedDate: book.volumeInfo.publishedDate || "Unknown",
          description:
            book.volumeInfo.description || "No description available",
          infoLink: book.volumeInfo.infoLink || "No link available",
          coverImage: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : "No image available",
          isbn: isbn
        },
        relatedBooks: relatedBooks,
      });
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    return res.message200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const {id} = req.params
    const one = await destroyService(id)
    if(!one) {
      return res.error404()
    } 
    return res.message200("The book has been deleted")
  } catch (error) {
    return next(error)
  }
}

async function update(req, res, next) {
  try {
    const {id} = req.params
    const data = req.body
    const one = await updateService(id, data)
    if(!one) {
      return res.error404()
    } 
    return res.message200("The book has been updated")
  } catch (error) {
    return next(error)
  }
}

export { getBooks, getOneBook, create, destroy, update };
