# Real-Time Chat Application

A modern, real-time chat application built with React, Socket.io, and Node.js. Features multiple rooms, file sharing, emoji support, and a beautiful UI matching the portfolio design style.

## Features

- 💬 **Real-time messaging** - Instant message delivery using Socket.io
- 🏠 **Multiple rooms** - Create and join different chat rooms
- 📎 **File sharing** - Share files up to 10MB with other users
- 😊 **Emoji support** - Built-in emoji picker for expressive messages
- 👥 **User presence** - See who's online in each room
- ⌨️ **Typing indicators** - Know when someone is typing
- 🎨 **Modern UI** - Beautiful design matching portfolio theme
- 🌓 **Dark theme** - Easy on the eyes with dark mode

## Project Structure

```
chat-app/
├── server/          # Node.js backend with Socket.io
│   ├── server.js    # Main server file
│   ├── uploads/     # Uploaded files directory
│   └── package.json
│
└── client/          # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── ChatRoom.jsx
    │   │   ├── RoomList.jsx
    │   │   ├── MessageList.jsx
    │   │   └── MessageInput.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd chat-app/server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd chat-app/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Usage

1. Start both the server and client (in separate terminals)
2. Open `http://localhost:5173` in your browser
3. Enter a username and select or create a room
4. Start chatting!

## Features in Detail

### Multiple Rooms
- Join existing rooms (General, Random, Tech, Gaming)
- Create custom rooms
- Switch between rooms seamlessly
- Each room maintains its own message history

### File Sharing
- Click the paperclip icon to attach files
- Supports all file types (images, documents, etc.)
- 10MB file size limit
- Files are stored on the server and accessible via download links

### Emoji Support
- Click the smiley face icon to open emoji picker
- Search and select emojis
- Emojis are rendered in messages

### Real-time Features
- Messages appear instantly for all users in the room
- See when users join or leave
- Typing indicators show who's currently typing
- User list updates in real-time

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Socket.io-client** - Real-time client
- **Emoji Picker React** - Emoji picker component
- **React Icons** - Icon library
- **Vite** - Build tool

## API Endpoints

### POST `/api/upload`
Upload a file to share in chat.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (file object)

**Response:**
```json
{
  "fileName": "example.pdf",
  "fileUrl": "/uploads/uuid-example.pdf",
  "fileSize": 1024,
  "fileType": "application/pdf"
}
```

### GET `/api/rooms`
Get list of available rooms.

**Response:**
```json
["General", "Random", "Tech", "Gaming"]
```

## Socket.io Events

### Client → Server
- `join` - Join a room
- `message` - Send a message
- `fileShare` - Share a file
- `createRoom` - Create a new room
- `typing` - Send typing indicator

### Server → Client
- `message` - Receive a message
- `roomHistory` - Receive room message history
- `userJoined` - User joined notification
- `userLeft` - User left notification
- `roomList` - Updated list of rooms
- `typing` - Typing indicator from other users

## Development

### Running in Development Mode

**Backend:**
```bash
cd chat-app/server
npm run dev  # Uses node --watch for auto-reload
```

**Frontend:**
```bash
cd chat-app/client
npm run dev  # Vite dev server with hot reload
```

## Production Build

### Frontend
```bash
cd chat-app/client
npm run build
```

The built files will be in the `dist` directory.

## Notes

- The server stores uploaded files in the `server/uploads` directory
- Message history is kept in memory (last 100 messages per room)
- For production, consider using a database for persistent storage
- File uploads should be cleaned up periodically in production

## License

MIT


