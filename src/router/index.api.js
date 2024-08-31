import usersRouter from "./users.api.js";
import CustomRouter from "./customRouter.js";
import sessionsRouter from "./sessions.api.js"
import booksRouter from "./books.api.js"

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/sessions", sessionsRouter)
    this.use("/books", booksRouter)
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
