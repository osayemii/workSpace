import { useState, useEffect, useRef } from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThemeToggle from './ThemeToggle';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import './ChatRoom.css';

const ChatRoom = ({ user, room, socket, onRoomChange, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());

  useEffect(() => {
    // Clear messages and typing users when room changes
    setMessages([]);
    setTypingUsers(new Set());
    
    // Listen for messages
    const handleMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    // Listen for room history
    const handleRoomHistory = (history) => {
      setMessages(history);
    };

    // Listen for user updates
    const handleUserJoined = (data) => {
      if (data.room === room) {
        setUsers(data.users);
      }
    };

    const handleUserLeft = (data) => {
      if (data.room === room) {
        setUsers(data.users);
      }
    };

    // Listen for room list updates
    const handleRoomList = (rooms) => {
      setAvailableRooms(rooms);
    };

    // Listen for typing indicators
    const handleTyping = (data) => {
      if (data.room === room) {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          if (data.isTyping) {
            newSet.add(data.username);
          } else {
            newSet.delete(data.username);
          }
          return newSet;
        });
      }
    };

    socket.on('message', handleMessage);
    socket.on('roomHistory', handleRoomHistory);
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);
    socket.on('roomList', handleRoomList);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('message', handleMessage);
      socket.off('roomHistory', handleRoomHistory);
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      socket.off('roomList', handleRoomList);
      socket.off('typing', handleTyping);
    };
  }, [socket, room]);

  const handleSendMessage = (message, type = 'text') => {
    if (message.trim() && socket && socket.connected) {
      socket.emit('message', {
        username: user,
        room,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        type
      });
    } else if (!socket || !socket.connected) {
      alert('Not connected to server. Please refresh the page.');
    }
  };

  const handleFileShare = (fileData) => {
    if (socket && socket.connected) {
      socket.emit('fileShare', {
        username: user,
        room,
        ...fileData,
        timestamp: new Date().toISOString()
      });
    } else {
      alert('Not connected to server. Please refresh the page.');
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>💬 Chat App</h2>
          <div className="sidebar-actions">
            <ThemeToggle />
            <button onClick={onLogout} className="btn-logout" title="Logout">
              <FiLogOut />
            </button>
          </div>
        </div>
        
        <div className="user-info">
          <div className="user-avatar">
            {user.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <div className="user-name">{user}</div>
            <div className="user-status">Online</div>
          </div>
        </div>

        <div className="room-section">
          <h3>Rooms</h3>
          <RoomList
            rooms={availableRooms}
            currentRoom={room}
            onRoomChange={onRoomChange}
            socket={socket}
          />
        </div>

        <div className="users-section">
          <h3>
            <FiUsers /> Users ({users.length})
          </h3>
          <div className="users-list">
            {users.map((username, index) => (
              <div key={index} className="user-item">
                <div className="user-indicator"></div>
                {username}
                {username === user && <span className="you-badge">You</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>#{room}</h2>
          <div className="typing-indicator">
            {typingUsers.size > 0 && (
              <span>
                {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
              </span>
            )}
          </div>
        </div>

        <MessageList messages={messages} currentUser={user} />

        <MessageInput
          onSendMessage={handleSendMessage}
          onFileShare={handleFileShare}
          onTyping={(isTyping) => {
            if (socket && socket.connected) {
              socket.emit('typing', {
                username: user,
                room,
                isTyping
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoom;

