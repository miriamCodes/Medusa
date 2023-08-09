// import { Server as SocketServer } from 'socket.io';
// import { server } from '../src/index';
// import Client from 'socket.io-client';
// import { Chatroom } from '../src/models/chatroom';
// import socketHandlers from '../src/socketHandlers';
// import * as SocketIOClient from 'socket.io-client';
// import { connectDb, closeDb } from '../src/db/db';

// describe('Socket Handlers', () => {
//   let io: SocketServer;
//   let clientSocket1: SocketIOClient.Socket;
//   let clientSocket2: SocketIOClient.Socket;

//   beforeAll(async () => {
//     await connectDb(); // Make sure to call the function if it returns a Promise
//     io = new SocketServer(server);
//     socketHandlers(io);

//     const address = server.address();
//     if (address && typeof address !== 'string') {
//       const port = address.port;
//       clientSocket1 = Client(`http://localhost:${port}`);
//       clientSocket2 = Client(`http://localhost:${port}`);
//     }

//     // Promisify the client socket connection events
//     return new Promise<void>((resolve) => {
//       clientSocket1.on('connect', () => {
//         clientSocket2.on('connect', () => resolve());
//       });
//     });
//   });

//   afterAll(async () => {
//     if (clientSocket1) clientSocket1.close();
//     if (clientSocket2) clientSocket2.close();
//     io.close();

//     server.close();

//     await closeDb();
//   });

//   beforeEach(async () => {
//     await Chatroom.deleteMany({});
//   });

//   it('should join users to the same chatroom with the same keyword', (done) => {
//     const roomName = 'keyword';
//     clientSocket1.emit('create_room', roomName);

//     clientSocket1.on('update_chatrooms', () => {
//       clientSocket1.emit('join_room', { name: roomName });
//       clientSocket2.emit('join_room', { name: roomName });
//     });

//     clientSocket2.on('user_join', (data) => {
//       expect(data.room).toBe(roomName);
//       expect(data.userCount).toBe(2);
//       done();
//     });
//   });

//   // it('should not join users to the same chatroom with different keywords', (done) => {
//   //   const roomName1 = 'keyword1';
//   //   const roomName2 = 'keyword2';
//   //   clientSocket1.emit('create_room', roomName1);
//   //   clientSocket2.emit('create_room', roomName2);

//   //   clientSocket2.on('update_chatrooms', () => {
//   //     clientSocket1.emit('join_room', { name: roomName1 });
//   //     clientSocket2.emit('join_room', { name: roomName2 });
//   //   });

//   //   clientSocket2.on('user_join', (data) => {
//   //     expect(data.room).not.toBe(roomName1);
//   //     expect(data.userCount).toBe(1);
//   //     done();
//   //   });
//   // });

//   // Add other test cases for send_message, leave_room, disconnect, etc. as needed.
// });
