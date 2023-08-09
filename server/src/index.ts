import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {connectDb} from "./db/db";
import middlewares from "./middlewares";
import routes from "./routes";
import socketHandler from "./socketHandlers";
import { authenticateToken } from "./auth/middleware"


connectDb();
const app: Express = express();
app.use(cors());
app.use(middlewares);
app.use(authenticateToken)

app.use(routes);



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

export default app; 
export { server };
