import usersRouter from "./users.api.js";
import CustomRouter from "./customRouter.js";
import sessionsRouter from "./sessions.api.js"

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/sessions", sessionsRouter)
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
