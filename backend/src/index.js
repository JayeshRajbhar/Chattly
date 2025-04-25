import express from 'express';
import authRoutes from './routes/auth.Route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import path from 'path';

import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';
dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

// Try modifying this section in index.js
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    // Use absolute path to avoid path-to-regexp issues
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});