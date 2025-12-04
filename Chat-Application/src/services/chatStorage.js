// localStorage-based chat storage service
// Handles all chat data persistence and cross-tab communication

const STORAGE_KEYS = {
  MESSAGES: 'chat_messages',
  ROOMS: 'chat_rooms',
  USERS: 'chat_users',
  CURRENT_USER: 'chat_current_user',
  CURRENT_ROOM: 'chat_current_room'
};

// Default rooms
const DEFAULT_ROOMS = ['General', 'Random', 'Tech', 'Gaming'];

// Initialize default rooms if they don't exist
export const initializeRooms = () => {
  const rooms = getRooms();
  if (rooms.length === 0) {
    saveRooms(DEFAULT_ROOMS);
  }
};

// Room management
export const getRooms = () => {
  try {
    const rooms = localStorage.getItem(STORAGE_KEYS.ROOMS);
    return rooms ? JSON.parse(rooms) : DEFAULT_ROOMS;
  } catch (error) {
    console.error('Error getting rooms:', error);
    return DEFAULT_ROOMS;
  }
};

export const saveRooms = (rooms) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error saving rooms:', error);
  }
};

export const addRoom = (roomName) => {
  const rooms = getRooms();
  if (!rooms.includes(roomName)) {
    rooms.push(roomName);
    saveRooms(rooms);
    return true;
  }
  return false;
};

// Message management
export const getMessages = (room) => {
  try {
    const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const messages = allMessages ? JSON.parse(allMessages) : {};
    const roomMessages = messages[room] || [];
    // Ensure messages are sorted by timestamp (oldest first)
    return roomMessages.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
    });
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

export const saveMessage = (room, message) => {
  try {
    const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const messages = allMessages ? JSON.parse(allMessages) : {};
    
    if (!messages[room]) {
      messages[room] = [];
    }
    
    // Add message with unique ID
    const messageWithId = {
      ...message,
      id: message.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    messages[room].push(messageWithId);
    
    // Sort messages by timestamp to maintain chronological order
    messages[room].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
    });
    
    // Keep only last 500 messages per room (increased from 100 for better history)
    if (messages[room].length > 500) {
      messages[room] = messages[room].slice(-500);
    }
    
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    
    // Trigger storage event for cross-tab communication
    // Note: 'storage' event only fires in other tabs, not the current tab
    // So we dispatch a custom event for same-tab listeners
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('chatStorageUpdate', { detail: { room } }));
    
    return messageWithId;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
};

// User management (for current session)
export const getUsersInRoom = (room) => {
  try {
    const allUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const users = allUsers ? JSON.parse(allUsers) : {};
    return users[room] || [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const addUserToRoom = (room, username) => {
  try {
    const allUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const users = allUsers ? JSON.parse(allUsers) : {};
    
    if (!users[room]) {
      users[room] = [];
    }
    
    if (!users[room].includes(username)) {
      users[room].push(username);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      window.dispatchEvent(new Event('storage'));
    }
    
    return users[room];
  } catch (error) {
    console.error('Error adding user to room:', error);
    return [];
  }
};

export const removeUserFromRoom = (room, username) => {
  try {
    const allUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const users = allUsers ? JSON.parse(allUsers) : {};
    
    if (users[room]) {
      users[room] = users[room].filter(u => u !== username);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      window.dispatchEvent(new Event('storage'));
    }
    
    return users[room] || [];
  } catch (error) {
    console.error('Error removing user from room:', error);
    return [];
  }
};

// Current session
export const setCurrentUser = (username) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
};

export const getCurrentUser = () => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
};

export const setCurrentRoom = (room) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_ROOM, room);
};

export const getCurrentRoom = () => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_ROOM);
};

export const clearSession = () => {
  const username = getCurrentUser();
  const room = getCurrentRoom();
  
  if (username && room) {
    removeUserFromRoom(room, username);
  }
  
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_ROOM);
};

// File handling - convert to base64
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Storage event listener helper
// Note: 'storage' event only fires for cross-tab changes
// For same-tab updates, components update state directly
export const onStorageChange = (callback) => {
  const handleStorage = () => {
    callback();
  };
  
  window.addEventListener('storage', handleStorage);
  
  return () => {
    window.removeEventListener('storage', handleStorage);
  };
};

