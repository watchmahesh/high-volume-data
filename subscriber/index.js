const express = require('express');
const redis = require('redis');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
require('dotenv').config();
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  });
const port = 3005;
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
const CHANNEL_NAME = 'messages';

client.subscribe(CHANNEL_NAME);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

client.on('message', (channel, message) => {
  const parsedMessage = JSON.parse(message);
  console.log(parsedMessage)
  if (parsedMessage.priority >= 7) {
    io.emit('message', parsedMessage);
  }
});

//Start the Express server
server.listen(port, () => {
  console.log(`Subscriber is running on port ${port}`);
});
