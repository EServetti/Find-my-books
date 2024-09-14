import CustomService from "./customService.js";
import sharedManager from "../DAO/mongo/managers/SharedManager.js";

const sharedService = new CustomService(sharedManager)
const {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService} = sharedService
export {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService}