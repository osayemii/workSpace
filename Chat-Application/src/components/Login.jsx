import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { getRooms, addRoom, onStorageChange } from '../services/chatStorage';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('General');
  const [availableRooms, setAvailableRooms] = useState(['General', 'Random', 'Tech', 'Gaming']);
  const [newRoomName, setNewRoomName] = useState('');
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);

  useEffect(() => {
    // Load initial rooms
    const rooms = getRooms();
    setAvailableRooms(rooms);
    if (rooms.length > 0 && !rooms.includes(selectedRoom)) {
      setSelectedRoom(rooms[0]);
    }

    // Listen for room updates (cross-tab)
    const cleanup = onStorageChange(() => {
      const updatedRooms = getRooms();
      setAvailableRooms(updatedRooms);
    });

    return cleanup;
  }, [selectedRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && selectedRoom) {
      onLogin(username.trim(), selectedRoom);
    }
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim() && !availableRooms.includes(newRoomName.trim())) {
      const success = addRoom(newRoomName.trim());
      if (success) {
        setSelectedRoom(newRoomName.trim());
        setNewRoomName('');
        setShowNewRoomInput(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-theme-toggle">
        <ThemeToggle />
      </div>
      <div className="login-card">
        <div className="login-header">
          <h1>💬 Chat Application</h1>
          <p>Join a room and start chatting!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="room">Select Room</label>
            <select
              id="room"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            >
              {availableRooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          {showNewRoomInput ? (
            <div className="form-group">
              <label htmlFor="newRoom">New Room Name</label>
              <div className="new-room-input">
                <input
                  type="text"
                  id="newRoom"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="Enter room name"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleCreateRoom}
                  className="btn-create"
                  disabled={!newRoomName.trim()}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewRoomInput(false);
                    setNewRoomName('');
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNewRoomInput(true)}
              className="btn-new-room"
            >
              + Create New Room
            </button>
          )}

          <button type="submit" className="btn-login">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


