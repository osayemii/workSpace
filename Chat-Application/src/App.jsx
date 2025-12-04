import { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { initializeRooms, setCurrentUser, setCurrentRoom, getCurrentUser, getCurrentRoom, clearSession, addUserToRoom, removeUserFromRoom } from './services/chatStorage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('chat-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize rooms
    initializeRooms();

    // Check if user was previously logged in
    const savedUser = getCurrentUser();
    const savedRoom = getCurrentRoom();
    
    if (savedUser && savedRoom) {
      setUser(savedUser);
      setRoom(savedRoom);
      addUserToRoom(savedRoom, savedUser);
    }
  }, []);

  const handleLogin = (username, selectedRoom) => {
    setUser(username);
    setRoom(selectedRoom);
    setCurrentUser(username);
    setCurrentRoom(selectedRoom);
    addUserToRoom(selectedRoom, username);
  };

  const handleRoomChange = (newRoom) => {
    if (newRoom !== room && user) {
      // Remove user from old room
      if (room) {
        removeUserFromRoom(room, user);
      }
      // Add user to new room
      setRoom(newRoom);
      setCurrentRoom(newRoom);
      addUserToRoom(newRoom, user);
    }
  };

  const handleLogout = () => {
    if (room && user) {
      removeUserFromRoom(room, user);
    }
    clearSession();
    setUser(null);
    setRoom(null);
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom
          user={user}
          room={room}
          onRoomChange={handleRoomChange}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;

