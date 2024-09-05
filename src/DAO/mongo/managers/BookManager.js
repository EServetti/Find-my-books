import Manager from "../Manager.mongo.js";
import Book from "../models/books.model.js"

const bookManager = new Manager(Book);

export default bookManager;