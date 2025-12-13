import './ExecutionOrder.css'
import { SKILL_LEVELS } from '../utils/goalAnalyzer'

function ExecutionOrder({ tasks }) {
  return (
    <div className="execution-order">
      <div className="order-timeline">
        {tasks.map((task, index) => (
          <div key={task.id} className="timeline-item">
            <div className="timeline-connector">
              {index < tasks.length - 1 && <div className="connector-line"></div>}
            </div>
            <div className="timeline-content">
              <div className="timeline-badge">{task.order}</div>
              <div className="timeline-card">
                <h3 className="timeline-title">{task.title}</h3>
                <p className="timeline-description">{task.description}</p>
                <div className="timeline-metadata">
                  <span 
                    className="timeline-effort"
                    style={{ backgroundColor: task.effort.color + '20', color: task.effort.color }}
                  >
                    {task.effort.label} Effort
                  </span>
                  <span 
                    className="timeline-skill"
                    style={{ backgroundColor: task.skillLevel.color + '20', color: task.skillLevel.color }}
                  >
                    {task.skillLevel.icon} {task.skillLevel.label}
                  </span>
                </div>
                {task.dependencies.length > 0 && (
                  <div className="timeline-dependencies">
                    <small>Requires: Tasks {task.dependencies.join(', ')}</small>
                  </div>
                )}
                <div className="timeline-subtasks-count">
                  {task.subtasks.length} sub-tasks
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="execution-notes">
        <h3>Execution Notes</h3>
        <ul>
          <li>Tasks should be executed in numerical order (1, 2, 3...)</li>
          <li>Tasks with dependencies must wait for prerequisite tasks to complete</li>
          <li>Some tasks can be worked on in parallel if they don't have dependencies</li>
          <li>Effort levels indicate relative complexity and time required</li>
        </ul>
      </div>
    </div>
  )
}

export default ExecutionOrder

