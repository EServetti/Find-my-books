function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') 
    .trim(); 
}

function limitBookVersions(books) {
  const bookMap = {};

  books.forEach(book => {
    const normalizedTitle = normalizeTitle(book.title);
    if (!bookMap[normalizedTitle]) {
      bookMap[normalizedTitle] = [];
    }
    if (bookMap[normalizedTitle].length < 3) {
      bookMap[normalizedTitle].push(book);
    }
  });

  return Object.values(bookMap).flat();
}

export default limitBookVersions
