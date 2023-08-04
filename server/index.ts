import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import db from "./db/db";
import middlewares from "./middlewares";
import routes from "./routes";
import socketHandler from "./socketHandlers";

db();
const app: Express = express();
app.use(cors());
app.use(middlewares);
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


// const fillDb = async (roomName) => {
//   const chatroom = new Chatroom({name: roomName});
//   await chatroom.save();
// }
// fillDb('Persian Philosophy');
// fillDb('Berlin Dating');
// fillDb('We need to talk about Barbie');



    // const chatrooms = await Chatroom.find({});
    // io.to(socket.id).emit("chatrooms_list", chatrooms);