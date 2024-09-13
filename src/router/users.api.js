import { read, readOne, update, destroy, friends } from "../controllers/controller.api.users.js";
import sendFriendRequest from "../controllers/friendRequests.js";
import validator from "../middlewares/joi.validator.js"
import { updateUsersValidate } from "../schemas/users.validator.js";
import CustomRouter from "./customRouter.js";
import selfRequest from "../middlewares/selfRequest.js"

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/friends", ["USER", "ADMIN"], friends)
    this.read("/:nid", ["ADMIN"], readOne);
    this.update("/:nid", ["USER", "ADMIN"], validator(updateUsersValidate), update);
    this.destroy("/:nid", ["USER", "ADMIN"], destroy);
    this.create("/add/:receiver", ["USER", "ADMIN"], selfRequest, sendFriendRequest)
  }
}



const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
