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
    //Evitar libros repetidos
    let processedTitles = [];
    const unwantedWords = [
      "summary",
      "analysis",
      "guide",
      "study",
      "review",
      "notes",
      "companion",
      "synopsis",
      "overview",
    ];

    return books
      .filter(
        (book) =>
          book.volumeInfo.industryIdentifiers &&
          book.volumeInfo.industryIdentifiers.some(
            (id) => id.type === "ISBN_13" || id.type === "ISBN_10"
          )
      )
      .filter((book) => {         
        const normalizedBookTitle = book.volumeInfo.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .split(" ") 
          .slice(0, 3) 
          .join(" ");

        // console.log(`titles: ${processedTitles}`);
        // console.log(`current: ${normalizedBookTitle}`);
        const alreadyProcessed = processedTitles.find(
          (title) => normalizedBookTitle.includes(title) || title.includes(normalizedBookTitle)
        );
        const containsUnwantedWords = unwantedWords.some((word) =>
          book.volumeInfo.title.toLowerCase().includes(word)
        );

        if (!alreadyProcessed && !containsUnwantedWords) {
          processedTitles.push(normalizedBookTitle);
          return true;
        }

        return false
      })
      .map((book) => {
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
          description:
            book.volumeInfo.description || "No description available",
          infoLink: book.volumeInfo.infoLink || "No link available",
          coverImage:
            book.volumeInfo.imageLinks?.thumbnail || "No cover image available",
          bigCoverImage:
            book.volumeInfo.imageLinks?.large || "No cover image available",
          isbn: isbn13 || isbn10, 
        };
      });
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
}

export { getBookDetails };
