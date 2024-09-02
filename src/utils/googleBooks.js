import axios from 'axios';

async function getBookDetails(title) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: `intitle:${title}`,
                key: process.env.GOOGLE_BOOKS_SECRET
            }
        });

        const books = response.data.items || [];
        return books.map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || ['Unknown'],
            publisher: book.volumeInfo.publisher || 'Unknown',
            publishedDate: book.volumeInfo.publishedDate || 'Unknown',
            description: book.volumeInfo.description || 'No description available',
            infoLink: book.volumeInfo.infoLink || 'No link available'
        }));
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
}

export { getBookDetails };