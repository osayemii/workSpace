import { useState, useEffect } from 'react'
import './HistoryPanel.css'

function HistoryPanel({ isOpen, onClose, onSelectGoal, currentGoal }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      const savedHistory = localStorage.getItem('goal-breakdown-history')
      return savedHistory ? JSON.parse(savedHistory) : []
    }
    setHistory(loadHistory())
  }, [isOpen])

  // Block body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('goal-breakdown-history')
      setHistory([])
    }
  }

  const deleteHistoryItem = (goalId, e) => {
    e.stopPropagation()
    if (window.confirm('Delete this goal from history?')) {
      const updatedHistory = history.filter(item => item.id !== goalId)
      localStorage.setItem('goal-breakdown-history', JSON.stringify(updatedHistory))
      setHistory(updatedHistory)
    }
  }

  if (!isOpen) return null

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-panel" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h2>Goal Breakdown History</h2>
          <button className="history-close" onClick={onClose}>×</button>
        </div>
        
        {history.length === 0 ? (
          <div className="history-empty">
            <p>No history yet. Start breaking down goals to see them here!</p>
          </div>
        ) : (
          <>
            <div className="history-actions">
              <div className="history-actions-content">
                <span className="history-total-goals">
                  <strong>{history.length}</strong> {history.length === 1 ? 'Goal' : 'Goals'}
                </span>
                <button className="history-clear-btn" onClick={clearHistory}>
                  Clear All History
                </button>
              </div>
            </div>
            <div className="history-list">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`history-item ${currentGoal === item.goal ? 'active' : ''}`}
                  onClick={() => {
                    onSelectGoal(item.goal, item.breakdown)
                    onClose()
                  }}
                >
                  <div className="history-item-content">
                    <h3 className="history-item-title">{item.goal}</h3>
                    <div className="history-item-meta">
                      <span className="history-item-date">
                        {new Date(item.createdAt).toLocaleDateString()} at{' '}
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                      <span className="history-item-stats">
                        {item.breakdown.summary.totalTasks} tasks • {item.breakdown.summary.totalSubtasks} subtasks
                      </span>
                    </div>
                  </div>
                  <div className="history-item-actions">
                    <button
                      className="history-item-delete"
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      title="Delete from history"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HistoryPanel

