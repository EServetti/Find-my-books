import { read, readOne, update, destroy, friends, recover, updatePassword } from "../controllers/controller.api.users.js";
import {answerFriendRequest, sendFriendRequest} from "../controllers/controller.api.friend.js";
import validator from "../middlewares/joi.validator.js"
import { updateUsersValidate } from "../schemas/users.validator.js";
import CustomRouter from "./customRouter.js";
import selfRequest from "../middlewares/selfRequest.js"
import alreadyFriend from "../middlewares/alreadyFriend.js";
import alreadySent from "../middlewares/alreadySent.js";
import saveImage from "../middlewares/saveImage.js";
import {readNotifications, updateNotifications} from "../controllers/controller.api.notification.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/friends", ["USER", "ADMIN"], friends)
    this.read("/notifications", ["USER", "ADMIN"], readNotifications)
    this.read("/:nid", ["ADMIN"], readOne);
    this.update("/password/:token", ["PUBLIC"], validator(updateUsersValidate), updatePassword)
    this.update("/friends/:nid", ["USER", "ADMIN"], answerFriendRequest)
    this.update("/notifications/:nid", ["USER", "ADMIN"], updateNotifications)
    this.update("/:nid", ["USER", "ADMIN"], validator(updateUsersValidate), saveImage, update);
    this.destroy("/:nid", ["USER", "ADMIN"], destroy);
    this.create("/add/:receiver", ["USER", "ADMIN"], selfRequest, alreadyFriend, alreadySent, sendFriendRequest)
    this.create("/recover", ["PUBLIC"], recover)
  }
}



const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
