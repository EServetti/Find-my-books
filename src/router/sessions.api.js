import CustomRouter from "./customRouter.js";
import {
  login,
  logout,
  register,
  data,
  verify,
} from "../controllers/controller.api.session.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/joi.validator.js";
import { usersValidate } from "../schemas/users.validator.js";
import extraUserInfo from "../middlewares/extraUserInfo.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      validator(usersValidate),
      passport.authenticate("register", { session: false }),
      register
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passport.authenticate("login", { session: false }),
      login
    );
    this.create(
      "/data",
      ["USER", "ADMIN"],
      passport.authenticate("data", { session: false }),
      extraUserInfo,
      data
    );
    this.create("/logout", ["USER", "ADMIN"], logout);
    this.update("/verify/:email/:verifyCode", ["PUBLIC"], verify);
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("Google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("Google", { session: false }),
      (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              secure: true,
              signedCookie: true,
              maxAge: 3600000,
              sameSite: "None",
            })
            .redirect("https://find-your-books.vercel.app");
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
