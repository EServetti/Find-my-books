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
  2. Si la entrada es una descripción general, sugiere una lista de títulos de libros que se ajusten a esta descripción.
  
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

// async function getBooksFromChatGPT(description) {
//   return [
//     "1984 de George Orwell",
//     "Brave New World de Aldous Huxley",
//     "Fahrenheit 451 de Ray Bradbury"
//   ];
// }

export default getBooksFromChatGPT;