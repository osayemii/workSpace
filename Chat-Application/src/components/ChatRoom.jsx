import { useState, useEffect } from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ThemeToggle from './ThemeToggle';
import { FiLogOut, FiUsers, FiMenu, FiX } from 'react-icons/fi';
import { 
  getMessages, 
  saveMessage, 
  getUsersInRoom, 
  getRooms, 
  onStorageChange 
} from '../services/chatStorage';
import './ChatRoom.css';

const ChatRoom = ({ user: firebaseUser, room, onRoomChange, onLogout }) => {
  // Get display name from Firebase user
  const user = firebaseUser?.displayName || firebaseUser?.email?.split('@')[0] || 'User';
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load messages and users when room changes or component mounts
  useEffect(() => {
    if (room) {
      // Load messages for current room immediately
      const roomMessages = getMessages(room);
      // Sort messages by timestamp to ensure chronological order
      const sortedMessages = roomMessages.sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeA - timeB;
      });
      setMessages(sortedMessages);
      
      // Load users in current room
      const roomUsers = getUsersInRoom(room);
      setUsers(roomUsers);
      
      // Load available rooms
      const rooms = getRooms();
      setAvailableRooms(rooms);
    }
  }, [room, user]);

  // Listen for storage changes (cross-tab and same-tab communication)
  useEffect(() => {
    const handleStorageChange = () => {
      if (room) {
        // Reload messages from storage to get latest state
        const roomMessages = getMessages(room);
        
        // Use functional update to ensure we get the latest state
        setMessages(prev => {
          // Check if messages actually changed to avoid unnecessary re-renders
          const prevIds = new Set(prev.map(m => m.id));
          const newIds = new Set(roomMessages.map(m => m.id));
          if (prevIds.size !== newIds.size || 
              ![...prevIds].every(id => newIds.has(id))) {
            return roomMessages;
          }
          return prev;
        });
        
        const roomUsers = getUsersInRoom(room);
        setUsers(roomUsers);
        
        const rooms = getRooms();
        setAvailableRooms(rooms);
      }
    };

    // Listen for cross-tab changes (storage event)
    const cleanup = onStorageChange(handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomStorage = (event) => {
      // Only update if the event is for the current room
      if (!event.detail || event.detail.room === room) {
        handleStorageChange();
      }
    };
    
    window.addEventListener('chatStorageUpdate', handleCustomStorage);
    
    return () => {
      cleanup();
      window.removeEventListener('chatStorageUpdate', handleCustomStorage);
    };
  }, [room]);

  const handleSendMessage = (message, type = 'text', fileData = null) => {
    if (message.trim() || fileData) {
      const messageData = {
        username: user,
        room,
        message: message.trim() || (fileData ? `Shared a file: ${fileData.fileName}` : ''),
        timestamp: new Date().toISOString(),
        type: fileData ? 'file' : type,
        ...(fileData && {
          fileName: fileData.fileName,
          fileUrl: fileData.fileUrl,
          fileSize: fileData.fileSize,
          fileType: fileData.fileType
        })
      };
      
      const savedMessage = saveMessage(room, messageData);
      if (savedMessage) {
        // Reload messages from storage to avoid duplicates
        // This ensures we get the latest state including any cross-tab updates
        const updatedMessages = getMessages(room);
        // Sort messages by timestamp
        const sortedMessages = updatedMessages.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeA - timeB;
        });
        setMessages(sortedMessages);
      }
    }
  };

  const handleFileShare = (fileData) => {
    handleSendMessage('', 'file', fileData);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRoomChangeMobile = (newRoom) => {
    onRoomChange(newRoom);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="chat-room">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div className={`chat-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>💬 Chat App</h2>
          <div className="sidebar-actions">
            <ThemeToggle />
            <button onClick={onLogout} className="btn-logout" title="Logout">
              <FiLogOut />
            </button>
            <button 
              className="mobile-menu-close" 
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <FiX />
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
            onRoomChange={handleRoomChangeMobile}
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
          <div className="chat-header-left">
            <button 
              className="mobile-menu-toggle" 
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <h2>#{room}</h2>
          </div>
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
            // Typing indicator is handled locally (could be enhanced with localStorage if needed)
            // For now, we'll keep it simple
          }}
        />
      </div>
    </div>
  );
};

export default ChatRoom;

