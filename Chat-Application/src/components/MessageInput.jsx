import { useState, useRef } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, onFileShare, onTyping }) => {
  const [message, setMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        onTyping(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Typing indicator
    onTyping(true);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      onTyping(false);
    }, 1000);
    setTypingTimeout(timeout);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit for localStorage - reduced from 10MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB for browser storage');
      e.target.value = '';
      return;
    }

    try {
      // Convert file to base64
      const { convertFileToBase64 } = await import('../services/chatStorage');
      const base64Data = await convertFileToBase64(file);
      
      // Create file data object
      const fileData = {
        fileName: file.name,
        fileUrl: base64Data, // Store as base64 data URL
        fileSize: file.size,
        fileType: file.type
      };
      
      onFileShare(fileData);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    }

    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-actions">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="action-btn"
            title="Attach file"
          >
            <FiPaperclip />
          </button>
        </div>

        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="message-input"
          autoFocus
        />

        <button type="submit" className="send-btn" disabled={!message.trim()}>
          <FiSend />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </form>
    </div>
  );
};

export default MessageInput;

