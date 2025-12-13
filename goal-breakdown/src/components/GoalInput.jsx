import { useState } from 'react'
import './GoalInput.css'
import ThemeToggle from './ThemeToggle'

function GoalInput({ onAnalyze, isAnalyzing }) {
  const [goalText, setGoalText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (goalText.trim()) {
      onAnalyze(goalText.trim())
    }
  }

  return (
    <div className="goal-input-container">
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="goal-label-wrapper">
          <label htmlFor="goal-input" className="goal-label">
            Enter your high-level goal
          </label>
          <ThemeToggle />
        </div>
        <textarea
          id="goal-input"
          className="goal-textarea"
          placeholder="e.g., Launch new feature by July or Reduce processing time by 50%"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          rows={4}
          disabled={isAnalyzing}
        />
        <button 
          type="submit" 
          className="analyze-button"
          disabled={!goalText.trim() || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            'Break Down Goal'
          )}
        </button>
      </form>
      
      <div className="examples">
        <p className="examples-title">Example goals:</p>
        <div className="example-buttons">
          <button 
            className="example-button"
            onClick={() => setGoalText("Launch new feature by July")}
            disabled={isAnalyzing}
          >
            Launch new feature by July
          </button>
          <button 
            className="example-button"
            onClick={() => setGoalText("Reduce processing time by 50%")}
            disabled={isAnalyzing}
          >
            Reduce processing time by 50%
          </button>
          <button 
            className="example-button"
            onClick={() => setGoalText("Improve customer satisfaction score to 90%")}
            disabled={isAnalyzing}
          >
            Improve customer satisfaction to 90%
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalInput

