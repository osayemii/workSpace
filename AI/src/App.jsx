import { useEffect, useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [conversations, setConversations] = useState(() => {
    const stored = window.localStorage.getItem('devChatbot:conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Remove welcome messages from existing conversations and add date fields if missing
      const cleaned = parsed.map((conv) => {
        const now = Date.now();
        return {
          ...conv,
          messages: conv.messages?.filter(
            (msg) =>
              !msg.text?.includes("Hi, I'm your software dev assistant") &&
              !msg.text?.includes("Tell me what massive, eye‑catching app")
          ) || [],
          createdAt: conv.createdAt || now,
          updatedAt: conv.updatedAt || conv.createdAt || now,
          pinned: conv.pinned !== undefined ? conv.pinned : false // Preserve existing pinned status
        };
      });
      return cleaned;
    }
    return [
      {
        id: Date.now().toString(),
        title: 'New conversation',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        pinned: false
      }
    ];
  });

  const [activeId, setActiveId] = useState(() => {
    const stored = window.localStorage.getItem('devChatbot:activeId');
    if (stored) return stored;
    return conversations[0]?.id ?? null;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const aiSuggestions = [
    "Build a React dashboard with real-time analytics",
    "Create a full-stack e-commerce app with payment integration",
    "Design a modern landing page with animations",
    "Build a task management app with drag-and-drop",
    "Create a social media feed with infinite scroll",
    "Build a weather app with beautiful UI",
    "Design a portfolio website with 3D effects",
    "Create a chat application with WebSocket",
    "Build a music player with waveform visualization",
    "Design a SaaS dashboard with charts and graphs",
    "Create a blog platform with markdown support",
    "Build a recipe app with search and filters",
    "Design a fitness tracker with progress charts",
    "Create a booking system with calendar integration",
    "Build a code editor with syntax highlighting",
    "Design a gaming leaderboard with real-time updates",
    "Create a photo gallery with lightbox effects",
    "Build a note-taking app with rich text editor",
    "Design a cryptocurrency tracker dashboard",
    "Create a video streaming platform UI"
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const currentCount = attachedFiles.length;
    const maxFiles = 3;
    
    if (currentCount >= maxFiles) {
      alert(`Maximum ${maxFiles} files allowed per message. Please remove some files first.`);
      e.target.value = ''; // Reset input
      return;
    }
    
    const remainingSlots = maxFiles - currentCount;
    const filesToAdd = files.slice(0, remainingSlots);
    
    if (files.length > remainingSlots) {
      alert(`You can only add ${remainingSlots} more file(s). Only the first ${remainingSlots} file(s) will be added.`);
    }
    
    const newFiles = filesToAdd.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = ''; // Reset input
  };

  const handleRemoveFile = (fileId) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleMenuToggle = (e, convId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === convId ? null : convId);
  };

  const handleMenuAction = (action, convId, e) => {
    e.stopPropagation();
    setOpenMenuId(null);
    
    if (action === 'rename') {
      const conv = conversations.find((c) => c.id === convId);
      if (conv) {
        setEditingTitle(conv.title || '');
        setEditingId(convId);
      }
    } else if (action === 'delete') {
      handleDeleteConversation(convId, e);
    } else if (action === 'share') {
      // Share functionality - share entire conversation content
      const conv = conversations.find((c) => c.id === convId);
      if (conv) {
        const title = conv.title || 'Untitled conversation';
        // Build conversation content text
        let conversationText = `${title}\n\n`;
        if (conv.messages && conv.messages.length > 0) {
          conv.messages.forEach((msg) => {
            const role = msg.from === 'user' ? 'User' : 'AI';
            conversationText += `${role}: ${msg.text || ''}\n\n`;
            // Include files if present
            if (msg.files && msg.files.length > 0) {
              conversationText += `Files: ${msg.files.map(f => f.name).join(', ')}\n\n`;
            }
          });
        } else {
          conversationText += 'No messages in this conversation.\n';
        }
        
        if (navigator.share) {
          navigator.share({
            title: title,
            text: conversationText
          }).catch(() => {});
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(conversationText);
          alert('Conversation content copied to clipboard');
        }
      }
    } else if (action === 'pin') {
      // Toggle pin status
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId ? { ...c, pinned: !c.pinned } : c
        )
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.history-menu-wrapper')) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openMenuId]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    window.localStorage.setItem('devChatbot:conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeConversation?.id) {
      window.localStorage.setItem('devChatbot:activeId', activeConversation.id);
    }
  }, [activeConversation]);

  // Auto-scroll to bottom when messages change or when loading
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const summarizeMessage = async (message) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Summarize this request in 3-5 words for a conversation title: "${message}"`,
          history: []
        })
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply?.trim().replace(/['"]/g, '') || message.slice(0, 40);
      }
    } catch (err) {
      console.error('Failed to summarize:', err);
    }
    return message.length > 40 ? `${message.slice(0, 40)}…` : message;
  };

  const startNewConversation = () => {
    const id = Date.now().toString();
    const now = Date.now();
    const newConv = {
      id,
      title: 'New conversation',
      messages: [],
      createdAt: now,
      updatedAt: now,
      pinned: false
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
    setSidebarOpen(false);
  };

  const updateActiveConversation = (updater) => {
    if (!activeConversation) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation.id) {
          const updated = { ...c, ...updater(c), updatedAt: Date.now() };
          if (!updated.createdAt) updated.createdAt = Date.now();
          return updated;
        }
        return c;
      })
    );
  };

  const renderMessageText = (text) => {
    // Split on ``` to detect code blocks in the AI output
    const segments = String(text).split(/```/);

    return segments.map((segment, index) => {
      // Odd indexes are inside ``` ... ``` → treat as code
      if (index % 2 === 1) {
        const lines = segment.split('\n');
        const firstLine = lines[0].trim();
        const looksLikeLanguage = /^[a-zA-Z0-9+#.\-]+$/.test(firstLine);
        const language = looksLikeLanguage ? firstLine : 'javascript';
        const code = looksLikeLanguage ? lines.slice(1).join('\n') : segment;

        return (
          <div key={index} className="code-block-wrapper">
            <div className="code-toolbar">
              <button
                type="button"
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  const value = code.trim();
                  navigator.clipboard
                    .writeText(value)
                    .then(() => {
                      setCopiedCode(value);
                      setTimeout(() => setCopiedCode(null), 1500);
                    })
                    .catch(() => {});
                }}
              >
                {copiedCode === code.trim() ? 'Copied' : 'Copy'}
              </button>
            </div>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}
              showLineNumbers={false}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        );
      }

      // Process markdown headings and text
      const lines = segment.split('\n');
      const elements = [];
      
      lines.forEach((line, lineIndex) => {
        const key = `segment-${index}-line-${lineIndex}`;
        
        // Check for markdown headings
        if (line.startsWith('# ')) {
          elements.push(
            <h1 key={key} className="message-heading message-h1">
              {line.substring(2).trim()}
            </h1>
          );
        } else if (line.startsWith('## ')) {
          elements.push(
            <h2 key={key} className="message-heading message-h2">
              {line.substring(3).trim()}
            </h2>
          );
        } else if (line.startsWith('### ')) {
          elements.push(
            <h3 key={key} className="message-heading message-h3">
              {line.substring(4).trim()}
            </h3>
          );
        } else if (line.trim()) {
          // Regular paragraph text
          elements.push(
            <p key={key} className="message-paragraph">
              {line}
            </p>
          );
        } else {
          // Empty line for spacing
          elements.push(<br key={key} />);
        }
      });

      return (
        <div key={index} className="message-text-content">
          {elements}
        </div>
      );
    });
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if ((!trimmed && attachedFiles.length === 0) || isLoading) return;

    const userMessage = {
      from: 'user',
      text: trimmed || 'Sent files',
      files: attachedFiles.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
        preview: f.preview
      }))
    };

    const nextMessages = [...messages, userMessage];

    // Update conversation title from first user message with AI summary
    if (activeConversation && activeConversation.title === 'New conversation') {
      const summarizedTitle = await summarizeMessage(trimmed);
      updateActiveConversation(() => ({
        title: summarizedTitle,
        messages: nextMessages
      }));
    } else {
      updateActiveConversation(() => ({
        messages: nextMessages
      }));
    }

    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m.from !== 'system')
        .slice(-6) // keep last 6 turns
        .reduce(
          (acc, m, idx, arr) => {
            if (m.from === 'user') {
              const assistantReply = arr[idx + 1]?.from === 'bot' ? arr[idx + 1].text : '';
              acc.push({ user: m.text, assistant: assistantReply });
            }
            return acc;
          },
          []
        );

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmed, history })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error || `Server error (${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      const reply = data.reply || 'Sorry, I could not generate a response.';

      updateActiveConversation((c) => ({
        messages: [...c.messages, { from: 'bot', text: reply }]
      }));
    } catch (err) {
      let errorMessage = 'Something went wrong. ';
      
      if (err.message.includes('OPENAI_API_KEY')) {
        errorMessage += 'Please set up your OpenAI API key in the .env file. See README.md for instructions.';
      } else if (err.message.includes('fetch')) {
        errorMessage += 'Could not connect to the server. Make sure the backend is running on port 5000.';
      } else {
        errorMessage += err.message || 'Check the server logs and your API key.';
      }

      updateActiveConversation((c) => ({
        messages: [
          ...c.messages,
          {
            from: 'bot',
            text: errorMessage
          }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEditStart = (conv, e) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditingTitle(conv.title);
  };

  const handleEditSave = (convId) => {
    if (editingTitle.trim()) {
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, title: editingTitle.trim() } : c))
      );
    }
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleDeleteConversation = (convId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== convId);
        
        // If we deleted the active conversation
        if (activeId === convId) {
          if (filtered.length > 0) {
            // Switch to the first remaining conversation
            setActiveId(filtered[0].id);
          } else {
            // Create a new conversation if none remain
            const newId = Date.now().toString();
            const now = Date.now();
            const newConv = {
              id: newId,
              title: 'New conversation',
              messages: [],
              createdAt: now,
              updatedAt: now,
              pinned: false
            };
            setActiveId(newId);
            return [newConv];
          }
        }
        
        return filtered;
      });
    }
  };

  const groupConversationsByDate = (convs) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      today: [],
      yesterday: [],
      older: []
    };

    convs.forEach((conv) => {
      const convDate = new Date(conv.updatedAt || conv.createdAt || Date.now());
      const convDateOnly = new Date(convDate.getFullYear(), convDate.getMonth(), convDate.getDate());

      if (convDateOnly.getTime() === today.getTime()) {
        groups.today.push(conv);
      } else if (convDateOnly.getTime() === yesterday.getTime()) {
        groups.yesterday.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="app">
      {!sidebarOpen && (
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle history"
        >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ strokeWidth: 0.5 }}
        >
          <path d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z" fill="currentColor" fillRule="evenodd"/>
        </svg>
      </button>
      )}

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-button" onClick={startNewConversation}>
            + New Chat
          </button>
        </div>
        <div className="history-list">
          {conversations.length === 0 ? (
            <div className="empty-history">
              <p>No conversations yet</p>
              <p className="empty-history-hint">Start a new chat to begin</p>
            </div>
          ) : (() => {
            // Separate pinned and unpinned conversations
            const pinned = conversations.filter(c => c.pinned);
            const unpinned = conversations.filter(c => !c.pinned);
            
            const grouped = groupConversationsByDate(unpinned);
            const sortConversations = (a, b) => {
              // Sort by date
              const dateA = a.updatedAt || a.createdAt || 0;
              const dateB = b.updatedAt || b.createdAt || 0;
              return dateB - dateA;
            };
            
            // Sort pinned items by date
            const sortedPinned = pinned.sort(sortConversations);
            const sortedOlder = grouped.older.sort(sortConversations);
            const sortedToday = grouped.today.sort(sortConversations);
            const sortedYesterday = grouped.yesterday.sort(sortConversations);

            const renderConversation = (conv) => (
              <div
                key={conv.id}
                className={`history-item ${conv.id === activeConversation?.id ? 'active' : ''} ${openMenuId === conv.id ? 'menu-open' : ''}`}
                onClick={() => {
                  if (editingId !== conv.id) {
                    setActiveId(conv.id);
                    setSidebarOpen(false);
                  }
                }}
                onDoubleClick={(e) => handleEditStart(conv, e)}
              >
                {editingId === conv.id ? (
                  <input
                    className="history-edit-input"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => handleEditSave(conv.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditSave(conv.id);
                      } else if (e.key === 'Escape') {
                        handleEditCancel();
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="history-title-wrapper">
                      {conv.pinned && (
                        <svg 
                          className="history-pin-icon" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M12 17v5"></path>
                          <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76z"></path>
                        </svg>
                      )}
                      <span className="history-title">{conv.title || 'Untitled conversation'}</span>
                    </div>
                    <div className="history-menu-wrapper">
                      <button
                        className="history-menu-btn"
                        onClick={(e) => handleMenuToggle(e, conv.id)}
                        aria-label="Menu"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                      {openMenuId === conv.id && (
                        <div className="history-menu-dropdown">
                          <button
                            className="history-menu-item"
                            onClick={(e) => handleMenuAction('rename', conv.id, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span>Rename</span>
                          </button>
                          <button
                            className="history-menu-item"
                            onClick={(e) => handleMenuAction('delete', conv.id, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            <span>Delete</span>
                          </button>
                          <button
                            className="history-menu-item"
                            onClick={(e) => handleMenuAction('share', conv.id, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3"></circle>
                              <circle cx="6" cy="12" r="3"></circle>
                              <circle cx="18" cy="19" r="3"></circle>
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span>Share</span>
                          </button>
                          <button
                            className="history-menu-item"
                            onClick={(e) => handleMenuAction('pin', conv.id, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 17v5"></path>
                              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.76z"></path>
                            </svg>
                            <span>{conv.pinned ? 'Unpin' : 'Pin'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );

            return (
              <>
                {sortedPinned.length > 0 && (
                  <>
                    <div className="history-date-header">Pinned</div>
                    {sortedPinned.map(renderConversation)}
                  </>
                )}
                {sortedToday.length > 0 && (
                  <>
                    <div className="history-date-header">Today</div>
                    {sortedToday.map(renderConversation)}
                  </>
                )}
                {sortedYesterday.length > 0 && (
                  <>
                    <div className="history-date-header">Yesterday</div>
                    {sortedYesterday.map(renderConversation)}
                  </>
                )}
                {sortedOlder.length > 0 && (
                  <>
                    {sortedOlder.reduce((acc, conv, idx) => {
                      const convDate = new Date(conv.updatedAt || conv.createdAt || Date.now());
                      const dateKey = `${convDate.getFullYear()}-${convDate.getMonth()}-${convDate.getDate()}`;
                      const prevDate = idx > 0 ? new Date(sortedOlder[idx - 1].updatedAt || sortedOlder[idx - 1].createdAt || Date.now()) : null;
                      const prevDateKey = prevDate ? `${prevDate.getFullYear()}-${prevDate.getMonth()}-${prevDate.getDate()}` : null;
                      
                      if (dateKey !== prevDateKey) {
                        acc.push(
                          <div key={`header-${dateKey}`} className="history-date-header">
                            {formatDate(conv.updatedAt || conv.createdAt || Date.now())}
                          </div>
                        );
                      }
                      acc.push(renderConversation(conv));
                      return acc;
                    }, [])}
                  </>
                )}
              </>
            );
          })()}
        </div>
      </aside>

      <div className="main-area">
          <main className="chat-container">
            <div className="messages" ref={messagesContainerRef}>
              {messages.length === 0 && !isLoading ? (
                <div className="empty-chat">
                  <div className="empty-chat-icon">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h2>Start a conversation</h2>
                  <p>Ask me to build a web app, debug code, or explain an error.</p>
                  <div className="empty-chat-examples">
                    <span>Try: "Build a React todo app"</span>
                    <span>or "Find the bug in this code"</span>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, idx) => (
                    <div key={idx} className={`message-row ${m.from === 'user' ? 'user' : 'bot'}`}>
                      <div className="bubble">
                        {m.text && renderMessageText(m.text)}
                        {m.files && m.files.length > 0 && (
                          <div className="message-files">
                            {m.files.map((file, fileIdx) => (
                              <div key={fileIdx} className="message-file">
                                {file.type?.startsWith('image/') && file.preview ? (
                                  <img src={file.preview} alt={file.name} className="file-preview-image" />
                                ) : file.type?.startsWith('video/') ? (
                                  <div className="file-preview-video">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="file-preview-document">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                      <polyline points="14 2 14 8 20 8"></polyline>
                                    </svg>
                                  </div>
                                )}
                                <div className="file-info">
                                  <span className="file-name">{file.name}</span>
                                  <span className="file-size">{formatFileSize(file.size)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="message-row bot">
                      <div className="bubble typing">Thinking...</div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-row">
              {attachedFiles.length > 0 && (
                <div className="attached-files">
                  {attachedFiles.map((file) => (
                    <div key={file.id} className="attached-file-item">
                      {file.preview ? (
                        <img src={file.preview} alt={file.name} className="attached-file-preview" />
                      ) : (
                        <div className="attached-file-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                        </div>
                      )}
                      <span className="attached-file-name">{file.name}</span>
                      <button
                        className="attached-file-remove"
                        onClick={() => handleRemoveFile(file.id)}
                        aria-label="Remove file"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="input-wrapper">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json,.xml"
                  style={{ display: 'none' }}
                />
                <button
                  className="file-attach-button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach file"
                  type="button"
                  disabled={attachedFiles.length >= 3}
                  title={attachedFiles.length >= 3 ? 'Maximum 3 files allowed' : 'Attach file'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <div className="textarea-container">
                  <textarea
                    rows={3}
                    placeholder="Ask anything"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button 
                    className="send-button"
                    onClick={handleSend} 
                    disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
                    aria-label="Send message"
                  >
                {isLoading ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="loading-icon"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <path d="M9 9h6v6H9z"></path>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
                  </button>
                </div>
              </div>
            </div>
          </main>
      </div>
    </div>
  );
}

export default App;


