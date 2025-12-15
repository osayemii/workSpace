import { useState, useEffect } from 'react'
import './App.css'
import GoalInput from './components/GoalInput'
import TaskBreakdown from './components/TaskBreakdown'
import HistoryPanel from './components/HistoryPanel'
import { analyzeGoal } from './utils/goalAnalyzer'

function App() {
  // Load persisted state from localStorage on mount
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem('goal-breakdown-current-goal')
    return savedGoal || ''
  })
  
  const [breakdown, setBreakdown] = useState(() => {
    const savedBreakdown = localStorage.getItem('goal-breakdown-current-breakdown')
    return savedBreakdown ? JSON.parse(savedBreakdown) : null
  })
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  // Save goal and breakdown to localStorage whenever they change
  useEffect(() => {
    if (goal) {
      localStorage.setItem('goal-breakdown-current-goal', goal)
    } else {
      localStorage.removeItem('goal-breakdown-current-goal')
    }
  }, [goal])

  useEffect(() => {
    if (breakdown) {
      localStorage.setItem('goal-breakdown-current-breakdown', JSON.stringify(breakdown))
    } else {
      localStorage.removeItem('goal-breakdown-current-breakdown')
    }
  }, [breakdown])

  const saveToHistory = (goalText, breakdownData) => {
    const historyItem = {
      id: `${goalText}-${Date.now()}`,
      goal: goalText,
      breakdown: breakdownData,
      createdAt: new Date().toISOString()
    }
    
    const existingHistory = localStorage.getItem('goal-breakdown-history')
    const history = existingHistory ? JSON.parse(existingHistory) : []
    
    // Check if this exact goal already exists, if so update it, otherwise add new
    const existingIndex = history.findIndex(item => item.goal === goalText)
    if (existingIndex >= 0) {
      history[existingIndex] = historyItem
    } else {
      history.unshift(historyItem) // Add to beginning
    }
    
    // Keep only last 50 items
    const limitedHistory = history.slice(0, 50)
    localStorage.setItem('goal-breakdown-history', JSON.stringify(limitedHistory))
  }

  const handleAnalyze = async (goalText, options = {}) => {
    setIsAnalyzing(true)
    setGoal(goalText)
    
    // Simulate analysis (in a real app, this could call an API)
    setTimeout(() => {
      const result = analyzeGoal(goalText, options)
      setBreakdown(result)
      saveToHistory(goalText, result)
      setIsAnalyzing(false)
    }, 1500)
  }

  const handleRegenerate = (regenerationOption) => {
    if (!goal) return
    
    let options = {}
    
    switch(regenerationOption) {
      case 'more-detailed':
        options = { detailLevel: 'more-detailed', timelineStyle: 'normal' }
        break
      case 'simpler':
        options = { detailLevel: 'simpler', timelineStyle: 'normal' }
        break
      case 'aggressive':
        options = { detailLevel: 'normal', timelineStyle: 'aggressive' }
        break
      case 'conservative':
        options = { detailLevel: 'normal', timelineStyle: 'conservative' }
        break
      default:
        options = {}
    }
    
    handleAnalyze(goal, options)
  }

  const handleSelectGoal = (goalText, breakdownData) => {
    setGoal(goalText)
    setBreakdown(breakdownData)
  }

  const handleReset = () => {
    // Clear all persisted data when resetting
    if (goal) {
      localStorage.removeItem(`goal-completion-${goal}`)
    }
    localStorage.removeItem('goal-breakdown-current-goal')
    localStorage.removeItem('goal-breakdown-current-breakdown')
    setGoal('')
    setBreakdown(null)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="fade-in">Goal Breakdown</h1>
        <p className="subtitle fade-in-delay">Translate strategy into actionable work packages</p>
      </header>

      <main className="app-main">
        {!breakdown ? (
          <div className="slide-up">
            <GoalInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
        ) : (
          <div className="fade-in">
            <TaskBreakdown 
              goal={goal} 
              breakdown={breakdown} 
              onReset={handleReset}
              onOpenHistory={() => setIsHistoryOpen(true)}
              onRegenerate={handleRegenerate}
              isRegenerating={isAnalyzing}
            />
          </div>
        )}
      </main>

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectGoal={handleSelectGoal}
        currentGoal={goal}
      />
    </div>
  )
}

export default App

