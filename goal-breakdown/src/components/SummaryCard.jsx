import './SummaryCard.css'

function SummaryCard({ summary }) {
  const hasProgress = summary.completedTasks !== undefined

  return (
    <div className="summary-card">
      <h3 className="summary-title">Project Summary</h3>
      {hasProgress && (
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${summary.overallProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">{summary.overallProgress}% Complete</div>
        </div>
      )}
      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-value">
            {hasProgress ? `${summary.completedTasks}/${summary.totalTasks}` : summary.totalTasks}
          </div>
          <div className="summary-label">
            {hasProgress ? 'Tasks Completed' : 'Main Tasks'}
          </div>
          {hasProgress && summary.remainingTasks > 0 && (
            <div className="summary-remaining">{summary.remainingTasks} remaining</div>
          )}
        </div>
        <div className="summary-item">
          <div className="summary-value">
            {hasProgress ? `${summary.completedSubtasks}/${summary.totalSubtasks}` : summary.totalSubtasks}
          </div>
          <div className="summary-label">
            {hasProgress ? 'Sub-tasks Completed' : 'Sub-tasks'}
          </div>
          {hasProgress && summary.remainingSubtasks > 0 && (
            <div className="summary-remaining">{summary.remainingSubtasks} remaining</div>
          )}
        </div>
        <div className="summary-item">
          <div className="summary-value">
            {hasProgress && summary.estimatedRemainingWeeks < summary.estimatedWeeks 
              ? `${summary.estimatedRemainingWeeks}/${summary.estimatedWeeks}` 
              : summary.estimatedWeeks}
          </div>
          <div className="summary-label">
            {hasProgress && summary.estimatedRemainingWeeks < summary.estimatedWeeks
              ? 'Weeks Remaining'
              : 'Estimated Weeks'}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-value">
            {hasProgress ? summary.remainingEffort : summary.totalEffort}
          </div>
          <div className="summary-label">
            {hasProgress ? 'Effort Remaining' : 'Total Effort Points'}
          </div>
          {hasProgress && summary.completedEffort > 0 && (
            <div className="summary-completed">{summary.completedEffort} completed</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SummaryCard

