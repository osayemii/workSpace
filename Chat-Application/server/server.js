import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// CORS configuration - allow all localhost ports for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow all localhost ports
    if (origin.match(/^http:\/\/localhost:\d+$/) || origin.match(/^http:\/\/127\.0\.0\.1:\d+$/)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

const io = new Server(httpServer, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.match(/^http:\/\/localhost:\d+$/) || origin.match(/^http:\/\/127\.0\.0\.1:\d+$/)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Store rooms and users
const rooms = new Map();
const users = new Map();

// Default rooms
const defaultRooms = ['General', 'Random', 'Tech', 'Gaming'];
defaultRooms.forEach(roomName => {
  rooms.set(roomName, {
    name: roomName,
    users: new Set(),
    messages: []
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', ({ username, room }) => {
    // Remove user from previous room if exists
    const previousUser = users.get(socket.id);
    if (previousUser && previousUser.room && rooms.has(previousUser.room)) {
      rooms.get(previousUser.room).users.delete(previousUser.username);
      socket.leave(previousUser.room);
      
      // Notify previous room about user leaving
      io.to(previousUser.room).emit('userLeft', {
        username: previousUser.username,
        room: previousUser.room,
        users: Array.from(rooms.get(previousUser.room).users)
      });
    }
    
    socket.username = username;
    socket.room = room;
    
    // Add user to new room
    if (!rooms.has(room)) {
      rooms.set(room, {
        name: room,
        users: new Set(),
        messages: []
      });
    }
    
    rooms.get(room).users.add(username);
    users.set(socket.id, { username, room });
    
    socket.join(room);
    
    // Notify room about new user
    io.to(room).emit('userJoined', {
      username,
      room,
      users: Array.from(rooms.get(room).users)
    });
    
    // Send room history to the new user
    socket.emit('roomHistory', rooms.get(room).messages);
    
    // Send list of available rooms
    socket.emit('roomList', Array.from(rooms.keys()));
  });

  // Handle messages
  socket.on('message', (data) => {
    const { username, room, message, timestamp, type = 'text' } = data;
    
    const messageData = {
      id: uuidv4(),
      username,
      message,
      timestamp: timestamp || new Date().toISOString(),
      type
    };
    
    // Store message in room history
    if (rooms.has(room)) {
      rooms.get(room).messages.push(messageData);
      // Keep only last 100 messages per room
      if (rooms.get(room).messages.length > 100) {
        rooms.get(room).messages.shift();
      }
    }
    
    // Broadcast to room
    io.to(room).emit('message', messageData);
  });

  // Handle file sharing
  socket.on('fileShare', (data) => {
    const { username, room, fileName, fileUrl, fileSize, fileType, timestamp } = data;
    
    const messageData = {
      id: uuidv4(),
      username,
      message: `Shared a file: ${fileName}`,
      timestamp: timestamp || new Date().toISOString(),
      type: 'file',
      fileName,
      fileUrl,
      fileSize,
      fileType
    };
    
    // Store message in room history
    if (rooms.has(room)) {
      rooms.get(room).messages.push(messageData);
      if (rooms.get(room).messages.length > 100) {
        rooms.get(room).messages.shift();
      }
    }
    
    // Broadcast to room
    io.to(room).emit('message', messageData);
  });

  // Handle room creation
  socket.on('createRoom', (roomName) => {
    if (!rooms.has(roomName)) {
      rooms.set(roomName, {
        name: roomName,
        users: new Set(),
        messages: []
      });
      
      // Notify all clients about new room
      io.emit('roomList', Array.from(rooms.keys()));
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.to(data.room).emit('typing', {
      username: data.username,
      room: data.room,
      isTyping: data.isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      const { username, room } = user;
      
      if (rooms.has(room)) {
        rooms.get(room).users.delete(username);
        
        // Notify room about user leaving
        io.to(room).emit('userLeft', {
          username,
          room,
          users: Array.from(rooms.get(room).users)
        });
      }
      
      users.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    fileName: req.file.originalname,
    fileUrl,
    fileSize: req.file.size,
    fileType: req.file.mimetype
  });
});

// Get available rooms
app.get('/api/rooms', (req, res) => {
  res.json(Array.from(rooms.keys()));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

