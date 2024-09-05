import CustomService from "./customService.js";
import bookManager from "../DAO/mongo/managers/BookManager.js";

const bookService = new CustomService(bookManager)
const {readService, readOneService, readByEmailService, createService, updateService, destroyService} = bookService
export {readService, readOneService, readByEmailService, createService, updateService, destroyService}