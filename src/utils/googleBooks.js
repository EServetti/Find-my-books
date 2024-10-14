import axios from "axios";

async function getBookDetails(title) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes`,
      {
        params: {
          q: `intitle:${title}`,
          key: process.env.GOOGLE_BOOKS_SECRET,
        },
      }
    );

    const books = response.data.items || [];
    const book = books[0];
    if (!book || !book.volumeInfo.industryIdentifiers) {
      return []
    }
    const isbn13 = book.volumeInfo.industryIdentifiers.find(
      (id) => id.type === "ISBN_13"
    )?.identifier;
    const isbn10 = book.volumeInfo.industryIdentifiers.find(
      (id) => id.type === "ISBN_10"
    )?.identifier;

    return {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ["Unknown"],
      publisher: book.volumeInfo.publisher || "Unknown",
      publishedDate: book.volumeInfo.publishedDate || "Unknown",
      description: book.volumeInfo.description || "No description available",
      infoLink: book.volumeInfo.infoLink || "No link available",
      coverImage:
        book.volumeInfo.imageLinks?.thumbnail || "No cover image available",
      bigCoverImage:
        book.volumeInfo.imageLinks?.large || "No cover image available",
      isbn: isbn13 || isbn10,
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
}

export { getBookDetails };
