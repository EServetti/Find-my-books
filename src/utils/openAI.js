import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

async function getBooksFromChatGPT(description) {
  const prompt = `
  La entrada proporcionada puede ser una cita específica de un libro o una descripción general de un libro. Por favor, realiza las siguientes tareas:
  1. Si la entrada parece una cita específica, identifica el título del libro correspondiente y devuélvelo.
  2. Si la entrada es una descripción general, sugiere una lista de al menos 15 títulos de libros que se ajusten a esta descripción.
  3. Intenta no solo centrarte en las palabras clave sino en la descripción completa.
  4. Ten en cuenta que los titulos seran utilizados por una api de Google Books para traer los datos de cada libro, asique no des titulos tan especificos sino el titulo principal del libro.
  
  La entrada puede estar en inglés o en español. Por favor, realiza la tarea en el idioma en que está escrita la entrada.
  
  Solo devuelve los títulos de los libros, separados por nuevas líneas. No incluyas ningún texto adicional o explicación.
  
  Descripción o cita: ${description}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un experto en libros." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    const suggestions = response.choices[0].message.content.trim();
    const bookList = suggestions.split("\n").filter((s) => s);

    return bookList;
  } catch (error) {
    console.error("Error al obtener libros de ChatGPT:", error);
    throw error;
  }
}

export async function getRelatedBooksFromChatGPT(title) {
  const prompt = `
  La entrada proporcionada es un título de un libro, necesito que completes esta tarea:
  Devolver una lista de libros relacionados con el del titulo pero que no sea el mismo libro ingresado
  
  Solo devuelve los títulos de los libros, separados por nuevas líneas. No incluyas ningún texto adicional o explicación.
  
  Título: ${title}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un experto en libros." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    const suggestions = response.choices[0].message.content.trim();
    const book = suggestions.split("\n").filter((s) => s);

    return book;
  } catch (error) {
    console.error("Error al obtener libros de ChatGPT:", error);
    throw error;
  }
}

export async function getBookRecommendations(userBooks) {
  const booksToConsider = userBooks.slice(0, 15);

  const prompt = `
  Basado en los siguientes libros que el usuario tiene en su lista:
  ${booksToConsider.map((book, index) => `${index + 1}. "${book.title}"`).join("\n")}
  Recomienda 10 libros que le puedan gustar al usuario teniendo en cuenta generos, autores y estilos de los libros anteriormente nombrados.
  Ten en cuenta que los titulos seran utilizados por una api de Google Books para traer los datos de cada libro, asique no des titulos tan especificos sino el titulo principal del libro.
  

  Solo devuelve los títulos de los libros, separados por nuevas líneas. No incluyas ningún texto adicional o explicación.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert in books."},
        { role: "user", content: prompt },  
      ],
      temperature: 0.7,  
    });
    const recommendations = response.choices[0].message.content
    return recommendations.split("\n").filter(line => line.trim());
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}


export default getBooksFromChatGPT;
