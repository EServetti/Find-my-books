import CustomService from "./customService.js";
import notificationManager from "../DAO/mongo/managers/NotificationManager.js";

const notificationService = new CustomService(notificationManager)
const {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService} = notificationService
export {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService}