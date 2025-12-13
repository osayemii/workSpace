import './TaskCard.css'
import { EFFORT_LEVELS, SKILL_LEVELS } from '../utils/goalAnalyzer'

function TaskCard({ task, isExpanded, onToggle, isCompleted = false, onTaskComplete = () => {}, subtaskCompletion = {}, onSubtaskComplete = () => {} }) {
  const handleCheckboxClick = (e) => {
    e.stopPropagation()
    onTaskComplete()
  }

  // Count completed subtasks
  const completedSubtasksCount = Object.values(subtaskCompletion).filter(Boolean).length
  const allSubtasksCompleted = completedSubtasksCount === task.subtasks.length && task.subtasks.length > 0

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox-wrapper" onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            className="task-checkbox"
            checked={isCompleted}
            onChange={handleCheckboxClick}
            onClick={handleCheckboxClick}
          />
          <span className="checkmark"></span>
        </div>
        <div className="task-content" onClick={onToggle}>
          <div className="task-main-info">
            <div className="task-order-badge">{task.order}</div>
            <div className="task-title-section">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </div>
          </div>
          <div className="task-metadata">
            <div className="effort-badge" style={{ backgroundColor: task.effort.color + '20', color: task.effort.color }}>
              {task.effort.label} Effort
            </div>
            <div className="skill-badge" style={{ backgroundColor: task.skillLevel.color + '20', color: task.skillLevel.color }}>
              <span className="skill-icon">{task.skillLevel.icon}</span>
              {task.skillLevel.label}
            </div>
            <button className="expand-button">
              {isExpanded ? '▼' : '▶'}
            </button>
          </div>
        </div>
      </div>

      <div className={`task-details ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {task.dependencies.length > 0 && (
            <div className="dependencies">
              <strong>Depends on:</strong> Tasks {task.dependencies.join(', ')}
            </div>
          )}
          
          <div className="subtasks-section">
            <h4 className="subtasks-title">
              Sub-tasks ({task.subtasks.length})
              {completedSubtasksCount > 0 && (
                <span className="subtasks-progress">
                  {' '}({completedSubtasksCount} completed)
                </span>
              )}
              {allSubtasksCompleted && (
                <span className="all-completed-badge">✓ All Complete</span>
              )}
            </h4>
            <div className="subtasks-list">
              {task.subtasks.map((subtask, index) => {
                const isSubtaskCompleted = subtaskCompletion[index] || false
                return (
                <div 
                  key={index} 
                  className={`subtask-item ${isSubtaskCompleted ? 'completed' : ''}`}
                  onClick={() => onSubtaskComplete(index)}
                >
                  <div className="subtask-checkbox-wrapper" onClick={(e) => {
                    e.stopPropagation()
                    onSubtaskComplete(index)
                  }}>
                    <input
                      type="checkbox"
                      className="subtask-checkbox"
                      checked={isSubtaskCompleted}
                      onChange={() => onSubtaskComplete(index)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="subtask-checkmark"></span>
                  </div>
                  <div className="subtask-content">
                    <span className="subtask-number">{index + 1}</span>
                    <span className={`subtask-title ${isSubtaskCompleted ? 'completed-text' : ''}`}>{subtask.title}</span>
                  </div>
                  <div className="subtask-badges">
                    <span 
                      className="subtask-effort"
                      style={{ backgroundColor: subtask.effort.color + '20', color: subtask.effort.color }}
                    >
                      {subtask.effort.label}
                    </span>
                    <span 
                      className="subtask-skill"
                      style={{ backgroundColor: subtask.skillLevel.color + '20', color: subtask.skillLevel.color }}
                    >
                      {subtask.skillLevel.icon} {subtask.skillLevel.label}
                    </span>
                  </div>
                </div>
              )
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default TaskCard

