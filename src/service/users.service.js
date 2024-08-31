import CustomService from "./customService.js";
import userManager from "../DAO/mongo/managers/UserManager.db.js";

const usersService = new CustomService(userManager)
const {readService, readOneService, readByEmailService, createService, updateService, destroyService} = usersService
export {readService, readOneService, readByEmailService, createService, updateService, destroyService}