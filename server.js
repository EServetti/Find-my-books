import express from "express";
import dbCallback from "./src/utils/dbCallback.js";
import dotenv from "dotenv";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import indexRouter from "./src/router/index.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cluster from "cluster";
import os from "os";

dotenv.config();
const port = process.env.PORT || 8080;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log("Primary process");

  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const server = express();

  const startCb = () => {
    console.log(`Worker ${process.pid} listening in port ${port}`);
    dbCallback();
  };

  server.listen(port, startCb);

  // // middlewares
  // const corsOptions = {
  //   origin: "http://localhost:5173",
  //   credentials: true,
  // };

  const corsOptions = {
    origin: 'https://find-your-books.vercel.app',
    credentials: true
  };
  server.use(cookieParser(process.env.SECRET_COOKIE));
  server.use(cors(corsOptions));
  server.use(express.json({ limit: "10mb" }));
  server.use(express.urlencoded({ limit: "10mb", extended: true }));

  //endpoints
  server.use(indexRouter);
  server.use(errorHandler);
  server.use(pathHandler);
}
