import express from "express"
import dbCallback from "./src/utils/dbCallback.js";
import dotenv from "dotenv"
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import indexRouter from "./src/router/index.router.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config()
const server = express()
const port = process.env.PORT || 8080
const startCb = () => {
  console.log(`Server listening in port ${port}`);
  dbCallback() 
}

server.listen(port, startCb)

//middlewares
// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true
// };

const corsOptions = {
  origin: 'https://find-your-books.vercel.app/',
  credentials: true
};
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(cors(corsOptions));
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ limit: '10mb', extended: true }));




//endpoints
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)

