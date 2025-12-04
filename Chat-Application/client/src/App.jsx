import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('chat-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize socket connection
    // Use environment variable for production, fallback to localhost for development
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    socketRef.current = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      transports: ['websocket', 'polling'],
      timeout: 20000
    });

    // Handle connection events
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Check initial connection state
    if (socketRef.current.connected) {
      setIsConnected(true);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleLogin = (username, selectedRoom) => {
    if (socketRef.current) {
      setUser(username);
      setRoom(selectedRoom);
      // Try to join even if not connected - socket will queue the event
      socketRef.current.emit('join', { username, room: selectedRoom });
    }
  };

  const handleRoomChange = (newRoom) => {
    if (newRoom !== room && socketRef.current) {
      setRoom(newRoom);
      socketRef.current.emit('join', { username: user, room: newRoom });
    }
  };

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setUser(null);
    setRoom(null);
    // Reconnect socket for next login
    if (socketRef.current) {
      socketRef.current.connect();
    }
  };

  return (
    <div className="app">
      {socketRef.current && !isConnected && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'var(--error-color)',
          color: 'white',
          padding: '0.5rem',
          textAlign: 'center',
          zIndex: 10000,
          fontSize: '0.9rem'
        }}>
          ⚠️ Not connected to server. Trying to reconnect...
        </div>
      )}
      {socketRef.current ? (
        <>
          {!user ? (
            <Login onLogin={handleLogin} socket={socketRef.current} />
          ) : (
            <ChatRoom
              user={user}
              room={room}
              socket={socketRef.current}
              onRoomChange={handleRoomChange}
              onLogout={handleLogout}
            />
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-color)' }}>
          <p>Initializing...</p>
        </div>
      )}
    </div>
  );
}

export default App;

