import request from 'supertest';
import app from '../src/index'; 
import {server} from '../src/index'; 
import {Chatroom} from '../src/models/chatroom';
import { Server as SocketServer } from 'socket.io';
import { closeDb } from '../src/db/db';


let io: SocketServer;

beforeAll(() => {
  io = new SocketServer(server);
});

afterAll(() => {
  // disconnect connections, server and db
  io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true);
  });
  io.close();
  closeDb();
  server.close();
});

describe('POST /chatrooms', () => {
  beforeEach(async () => { // clearing chatroom collection before each test
      await Chatroom.deleteMany({});
  });

  it('should create a new chatroom when provided with valid data', async () => {
      const chatroom = {
          name: 'Test Room'
      };
      const res = await request(app).post('/chatrooms').send(chatroom);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', 'Test Room');
  });

  it('should store the created chatroom correctly in the database', async () => {
    const chatroomName = 'dbTest Room';
    const res = await request(app).post('/chatrooms').send({ name: chatroomName });
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', chatroomName);
  
    const chatroom = await Chatroom.findOne({ name: chatroomName });
    expect(chatroom).not.toBeNull();
    expect(chatroom?.name).toBe(chatroomName);
  });
  

  it('should return 400 Bad Request if name is missing', async () => {
    const res = await request(app).post('/chatrooms').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please provide a valid name for the chatroom.');
  });

  it('should return 400 Bad Request if name is not a string', async () => {
    const chatroom = { name: ['Not a string'] };
    const res = await request(app).post('/chatrooms').send(chatroom);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please provide a valid name for the chatroom.');
  });
    
});

describe('GET /chatrooms', () => {
  beforeEach(async () => {
    // Create a chatroom directly in the database, bypassing the API endpoint
    const chatroom = new Chatroom({ name: 'Test Room' });
    await chatroom.save();
  });
  
  afterEach(async () => {
    await Chatroom.deleteMany({});
  });

  it('should retrieve all chatrooms', async () => {
    const res = await request(app).get('/chatrooms');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
  
});







