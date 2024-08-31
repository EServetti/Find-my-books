import CustomRouter from "./customRouter.js";
import { login,logout, register, data, verify } from "../controllers/controller.api.session.js";
import passport from "../middlewares/passport.js"
import validator from "../middlewares/joi.validator.js"
import { usersValidate } from "../schemas/users.validator.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], validator(usersValidate),  passport.authenticate("register", {session: false}), register);
    this.create("/login", ["PUBLIC"], passport.authenticate("login", {session: false}), login);
    this.create("/data", ["USER", "ADMIN"], passport.authenticate("data", {session: false}), data);
    this.create("/logout", ["USER", "ADMIN"], logout);
    this.create("/verify/:email/:verifyCode", ["PUBLIC"], verify)
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
