import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import { initializeRooms, setCurrentRoom, getCurrentRoom, clearSession, addUserToRoom, removeUserFromRoom } from './services/chatStorage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('chat-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize rooms
    initializeRooms();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      // If user is logged in, check for saved room preference
      if (firebaseUser) {
        const savedRoom = getCurrentRoom();
        if (savedRoom) {
          setRoom(savedRoom);
          addUserToRoom(savedRoom, firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User');
        }
      } else {
        setRoom(null);
        clearSession();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (selectedRoom) => {
    // Auth state change will handle setting the user
    if (selectedRoom) {
      setRoom(selectedRoom);
      setCurrentRoom(selectedRoom);
      if (auth.currentUser) {
        addUserToRoom(selectedRoom, auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'User');
      }
    }
  };

  const handleRoomChange = (newRoom) => {
    if (newRoom !== room && user) {
      // Remove user from old room
      if (room) {
        const username = user.displayName || user.email?.split('@')[0] || 'User';
        removeUserFromRoom(room, username);
      }
      // Add user to new room
      setRoom(newRoom);
      setCurrentRoom(newRoom);
      const username = user.displayName || user.email?.split('@')[0] || 'User';
      addUserToRoom(newRoom, username);
    }
  };

  const handleLogout = async () => {
    try {
      if (room && user) {
        const username = user.displayName || user.email?.split('@')[0] || 'User';
        removeUserFromRoom(room, username);
      }
      await signOut(auth);
      clearSession();
      setRoom(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {!user || !room ? (
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

