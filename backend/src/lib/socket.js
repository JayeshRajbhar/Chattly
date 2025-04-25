import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);  

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap={};

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User ID: ${userId} is connected with socket ID: ${socket.id}`);
    } else {
        console.log("User ID not provided in handshake query.");
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    const userId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === socket.id);
  if (userId) {
    delete userSocketMap[userId];
  }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };