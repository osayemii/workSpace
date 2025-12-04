# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Backend Dependencies
```bash
cd chat-app/server
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 3: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd chat-app/server
npm start
```
Server will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd chat-app/client
npm run dev
```
Client will run on `http://localhost:5173`

### Step 4: Open in Browser
Navigate to `http://localhost:5173` and start chatting!

## Features to Try

1. **Join a Room**: Select an existing room or create a new one
2. **Send Messages**: Type and press Enter or click Send
3. **Add Emojis**: Click the 😊 icon to open emoji picker
4. **Share Files**: Click the 📎 icon to upload and share files
5. **Switch Rooms**: Click on different rooms in the sidebar
6. **See Typing**: Watch for typing indicators when others are typing

## Troubleshooting

- **Port already in use**: Change the port in `server.js` (line 240) or `vite.config.js`
- **Files not uploading**: Make sure the `server/uploads` directory exists
- **Connection issues**: Ensure both servers are running and check CORS settings

Enjoy chatting! 💬


