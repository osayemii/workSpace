import { useEffect, useRef } from 'react';
import { FiDownload, FiFile } from 'react-icons/fi';
import './MessageList.css';

const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.username === currentUser ? 'own-message' : ''} ${message.type === 'file' ? 'file-wrapper' : ''}`}
          >
            <div className="message-content">
              {message.username !== currentUser && (
                <div className="message-username">{message.username}</div>
              )}
              
              {message.type === 'file' ? (
                <div className="file-message">
                  {message.fileType?.startsWith('image/') ? (
                    // Display image preview
                    <div className="image-preview">
                      <img 
                        src={message.fileUrl} 
                        alt={message.fileName}
                        className="shared-image"
                        onClick={() => window.open(message.fileUrl, '_blank')}
                      />
                      <div className="image-info">
                        <div className="file-name">{message.fileName}</div>
                        <div className="file-meta">
                          {formatFileSize(message.fileSize)}
                        </div>
                      </div>
                      <a
                        href={message.fileUrl}
                        download={message.fileName}
                        className="file-download"
                        title="Download image"
                      >
                        <FiDownload />
                      </a>
                    </div>
                  ) : (
                    // Display file info for non-images
                    <>
                      <div className="file-icon">
                        <FiFile />
                      </div>
                      <div className="file-info">
                        <div className="file-name">{message.fileName}</div>
                        <div className="file-meta">
                          {formatFileSize(message.fileSize)} • {message.fileType || 'File'}
                        </div>
                      </div>
                      <a
                        href={message.fileUrl}
                        download={message.fileName}
                        className="file-download"
                        title="Download file"
                      >
                        <FiDownload />
                      </a>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-message">{message.message}</div>
              )}
              
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;


