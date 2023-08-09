import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import db from "./db/db";
import middlewares from "./middlewares";
import routes from "./routes";
import socketHandler from "./socketHandlers";
import { authenticateToken } from "./auth/middleware"


db();
const app: Express = express();
app.use(cors());
app.use(middlewares);
app.use(authenticateToken)

app.use(routes);



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});