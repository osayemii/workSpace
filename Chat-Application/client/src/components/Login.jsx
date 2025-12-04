import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import './Login.css';

const Login = ({ onLogin, socket }) => {
  const [username, setUsername] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('General');
  const [availableRooms, setAvailableRooms] = useState(['General', 'Random', 'Tech', 'Gaming']);
  const [newRoomName, setNewRoomName] = useState('');
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);

  useEffect(() => {
    // Listen for room list updates
    socket.on('roomList', (rooms) => {
      setAvailableRooms(rooms);
    });

    // Get initial room list
    fetch('http://localhost:3001/api/rooms')
      .then(res => res.json())
      .then(rooms => setAvailableRooms(rooms))
      .catch(err => console.error('Error fetching rooms:', err));

    return () => {
      socket.off('roomList');
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && selectedRoom) {
      onLogin(username.trim(), selectedRoom);
    }
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim() && !availableRooms.includes(newRoomName.trim())) {
      socket.emit('createRoom', newRoomName.trim());
      setSelectedRoom(newRoomName.trim());
      setNewRoomName('');
      setShowNewRoomInput(false);
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


