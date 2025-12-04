import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import ThemeToggle from './ThemeToggle';
import { getRooms, addRoom, onStorageChange } from '../services/chatStorage';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('General');
  const [availableRooms, setAvailableRooms] = useState(['General', 'Random', 'Tech', 'Gaming']);
  const [newRoomName, setNewRoomName] = useState('');
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  // Check if user is already authenticated
  useEffect(() => {
    if (auth.currentUser) {
      // User is already logged in, they just need to select a room
      setEmail(auth.currentUser.email || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If user is authenticated, just select room
    if (auth.currentUser && selectedRoom) {
      onLogin(selectedRoom);
      return;
    }
    
    // Otherwise, authenticate first
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create new user account
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // After successful auth, proceed with room selection
      if (selectedRoom) {
        onLogin(selectedRoom);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <p>{isLogin ? 'Sign in to continue' : 'Create an account to get started'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <FiUser className="form-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                style={{ paddingLeft: '45px' }}
              />
            </div>
          )}

          <div className="form-group">
            <FiMail className="form-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
          </div>

          <div className="form-group">
            <FiLock className="form-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '45px' }}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
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

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="toggle-auth"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


