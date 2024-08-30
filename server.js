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
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }))



//endpoints
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)

