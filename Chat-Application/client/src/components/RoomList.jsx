import { useState } from 'react';
import { FiHash, FiPlus } from 'react-icons/fi';
import './RoomList.css';

const RoomList = ({ rooms, currentRoom, onRoomChange, socket }) => {
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim() && !rooms.includes(newRoomName.trim())) {
      socket.emit('createRoom', newRoomName.trim());
      onRoomChange(newRoomName.trim());
      setNewRoomName('');
      setShowNewRoomInput(false);
    }
  };

  return (
    <div className="room-list">
      {rooms.map(roomName => (
        <button
          key={roomName}
          className={`room-item ${roomName === currentRoom ? 'active' : ''}`}
          onClick={() => onRoomChange(roomName)}
        >
          <FiHash />
          {roomName}
        </button>
      ))}
      
      {showNewRoomInput ? (
        <form onSubmit={handleCreateRoom} className="new-room-form">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Room name"
            autoFocus
            className="new-room-input"
          />
          <div className="new-room-actions">
            <button type="submit" className="btn-confirm" disabled={!newRoomName.trim()}>
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
        </form>
      ) : (
        <button
          className="room-item new-room-btn"
          onClick={() => setShowNewRoomInput(true)}
        >
          <FiPlus />
          Create Room
        </button>
      )}
    </div>
  );
};

export default RoomList;


