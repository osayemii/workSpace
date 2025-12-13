import { useState } from 'react'
import './RegenerationOptions.css'

function RegenerationOptions({ goal, onRegenerate, isRegenerating }) {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleRegenerate = (option) => {
    setSelectedOption(option)
    onRegenerate(option)
    // Reset selection after a delay
    setTimeout(() => setSelectedOption(null), 2000)
  }

  const options = [
    { 
      id: 'more-detailed', 
      label: 'More Detailed', 
      icon: '📋', 
      description: 'Break down into more granular tasks and sub-tasks' 
    },
    { 
      id: 'simpler', 
      label: 'Simpler', 
      icon: '✨', 
      description: 'Create a high-level, simplified breakdown' 
    },
    { 
      id: 'aggressive', 
      label: 'Aggressive Timeline', 
      icon: '⚡', 
      description: 'Compress timeline for faster delivery' 
    },
    { 
      id: 'conservative', 
      label: 'Conservative', 
      icon: '🛡️', 
      description: 'Extend timeline with buffer time' 
    }
  ]

  return (
    <div className="regeneration-options">
      <h4 className="regeneration-title">Regenerate Breakdown</h4>
      <div className="regeneration-buttons">
        {options.map((option) => (
          <button
            key={option.id}
            className={`regeneration-button ${selectedOption === option.id ? 'active' : ''} ${isRegenerating ? 'disabled' : ''}`}
            onClick={() => !isRegenerating && handleRegenerate(option.id)}
            disabled={isRegenerating}
            title={option.description}
          >
            <span className="regeneration-icon">{option.icon}</span>
            <span className="regeneration-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RegenerationOptions

