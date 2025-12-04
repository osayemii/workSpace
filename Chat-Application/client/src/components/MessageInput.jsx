import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { FiSend, FiPaperclip, FiSmile, FiX } from 'react-icons/fi';
import './MessageInput.css';

const MessageInput = ({ onSendMessage, onFileShare, onTyping }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [emojiPickerHeight, setEmojiPickerHeight] = useState('350px');
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    const handleResize = () => {
      setEmojiPickerHeight(window.innerWidth <= 480 ? '300px' : '350px');
    };

    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
      setShowEmojiPicker(false);
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

  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    // Trigger typing indicator
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

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onFileShare(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please check your connection.');
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
          
          <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`action-btn ${showEmojiPicker ? 'active' : ''}`}
              title="Add emoji"
            >
              <FiSmile />
            </button>
            
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <button
                  type="button"
                  className="emoji-picker-close"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <FiX />
                </button>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'}
                  width="100%"
                  height={emojiPickerHeight}
                  skinTonesDisabled={false}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
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

