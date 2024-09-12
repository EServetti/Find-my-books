import CustomService from "./customService.js";
import friendRequestsManager from "../DAO/mongo/managers/FriendRequestsManager.js";

const friendRequestService = new CustomService(friendRequestsManager)
const {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService} = friendRequestService
export {readService, readOneService, readByEmailService, readFriedRequestService, createService, updateService, destroyService}