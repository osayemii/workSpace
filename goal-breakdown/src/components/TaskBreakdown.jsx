import { useState, useEffect, useMemo, useRef } from 'react'
import './TaskBreakdown.css'
import TaskCard from './TaskCard'
import SummaryCard from './SummaryCard'
import ExecutionOrder from './ExecutionOrder'
import ThemeToggle from './ThemeToggle'
import ExportButton from './ExportButton'
import RegenerationOptions from './RegenerationOptions'
import { EFFORT_LEVELS, SKILL_LEVELS } from '../utils/goalAnalyzer'

function TaskBreakdown({ goal, breakdown, onReset, onOpenHistory, onRegenerate, isRegenerating }) {
  const [selectedView, setSelectedView] = useState('tasks') // 'tasks' or 'order'
  const [expandedTaskId, setExpandedTaskId] = useState(null)
  const previousGoalRef = useRef(goal)
  const completionStateRef = useRef({})

  // Track completion state: { taskId: { completed: boolean, subtasks: { index: boolean } } }
  // Load from localStorage if available, otherwise initialize with empty state
  const [completionState, setCompletionState] = useState(() => {
    const saved = localStorage.getItem(`goal-completion-${goal}`)
    const state = saved ? JSON.parse(saved) : {}
    completionStateRef.current = state
    return state
  })

  // Load completion state when goal changes
  useEffect(() => {
    // Save the previous goal's completion state before switching
    if (previousGoalRef.current && previousGoalRef.current !== goal) {
      localStorage.setItem(`goal-completion-${previousGoalRef.current}`, JSON.stringify(completionStateRef.current))
    }

    // Load completion state for the current goal
    const saved = localStorage.getItem(`goal-completion-${goal}`)
    if (saved) {
      const state = JSON.parse(saved)
      setCompletionState(state)
      completionStateRef.current = state
    } else {
      setCompletionState({})
      completionStateRef.current = {}
    }

    // Update the previous goal reference
    previousGoalRef.current = goal
    // Note: We preserve completion states for all goals so users can switch between them
  }, [goal])

  // Save completion state to localStorage whenever it changes (only for current goal)
  useEffect(() => {
    if (goal) {
      completionStateRef.current = completionState
      localStorage.setItem(`goal-completion-${goal}`, JSON.stringify(completionState))
    }
  }, [completionState, goal])

  const handleTaskToggle = (taskId) => {
    // If clicking the same task, close it. Otherwise, open the new one and close the previous
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
  }

  const toggleTaskCompletion = (taskId) => {
    const task = breakdown.tasks.find(t => t.id === taskId)
    const isCurrentlyCompleted = completionState[taskId]?.completed || false

    setCompletionState(prev => {
      // If marking as complete, also mark all subtasks as complete
      // If unmarking, also unmark all subtasks
      const allSubtasksCompleted = {}
      if (task) {
        task.subtasks.forEach((_, index) => {
          allSubtasksCompleted[index] = !isCurrentlyCompleted
        })
      }

      return {
        ...prev,
        [taskId]: {
          completed: !isCurrentlyCompleted,
          subtasks: !isCurrentlyCompleted ? allSubtasksCompleted : {}
        }
      }
    })
  }

  const toggleSubtaskCompletion = (taskId, subtaskIndex) => {
    setCompletionState(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        completed: prev[taskId]?.completed || false,
        subtasks: {
          ...prev[taskId]?.subtasks,
          [subtaskIndex]: !prev[taskId]?.subtasks?.[subtaskIndex]
        }
      }
    }))
  }

  // Calculate dynamic summary
  const dynamicSummary = useMemo(() => {
    const totalTasks = breakdown.tasks.length
    const totalSubtasks = breakdown.tasks.reduce((sum, task) => sum + task.subtasks.length, 0)

    const completedTasks = breakdown.tasks.filter(task =>
      completionState[task.id]?.completed
    ).length

    const completedSubtasks = breakdown.tasks.reduce((sum, task) => {
      const taskSubtasks = completionState[task.id]?.subtasks || {}
      const completed = Object.values(taskSubtasks).filter(Boolean).length
      return sum + completed
    }, 0)

    const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0
    const overallProgress = (taskProgress + subtaskProgress) / 2

    // Calculate remaining effort
    const completedEffort = breakdown.tasks.reduce((sum, task) => {
      if (completionState[task.id]?.completed) {
        const taskEffort = task.effort.value
        const subtaskEffort = task.subtasks.reduce((s, st) => s + st.effort.value, 0)
        return sum + taskEffort + subtaskEffort
      } else {
        // Count completed subtasks effort
        const taskSubtasks = completionState[task.id]?.subtasks || {}
        const subtaskEffort = task.subtasks.reduce((s, st, idx) => {
          return s + (taskSubtasks[idx] ? st.effort.value : 0)
        }, 0)
        return sum + subtaskEffort
      }
    }, 0)

    const remainingEffort = breakdown.summary.totalEffort - completedEffort
    const estimatedRemainingWeeks = Math.ceil((remainingEffort / breakdown.summary.totalEffort) * breakdown.summary.estimatedWeeks)

    return {
      ...breakdown.summary,
      completedTasks,
      completedSubtasks,
      remainingTasks: totalTasks - completedTasks,
      remainingSubtasks: totalSubtasks - completedSubtasks,
      taskProgress: Math.round(taskProgress),
      subtaskProgress: Math.round(subtaskProgress),
      overallProgress: Math.round(overallProgress),
      completedEffort,
      remainingEffort,
      estimatedRemainingWeeks: estimatedRemainingWeeks > 0 ? estimatedRemainingWeeks : 0
    }
  }, [breakdown, completionState])

  return (
    <div className="task-breakdown-container">
      <div className="breakdown-header">
        <div className="goal-title-wrapper">
          <button className="reset-button" onClick={onReset}>
            ← New Goal
          </button>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <ThemeToggle />
            <button className="history-button" onClick={onOpenHistory} title="View History">
              <svg height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3.3C13.1 1.1 8.3 1.8 5.1 4.8V3c0-.6-.4-1-1-1s-1 .4-1 1v4.5c0 .6.4 1 1 1h4.5c.6 0 1-.4 1-1s-.4-1-1-1H6.2C7.7 4.9 9.8 4 12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8s-8-3.6-8-8c0-.6-.4-1-1-1s-1 .4-1 1c0 5.5 4.5 10 10 10c3.6 0 6.9-1.9 8.7-5c2.7-4.8 1.1-10.9-3.7-13.7zM12 8c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1h-1V9c0-.6-.4-1-1-1z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        <div className="header-actions">
          <h2 className="goal-title">{goal}</h2>
        </div>
        <div className="view-toggle">
          <button
            className={`toggle-button ${selectedView === 'tasks' ? 'active' : ''}`}
            onClick={() => setSelectedView('tasks')}
          >
            Tasks
          </button>
          <button
            className={`toggle-button ${selectedView === 'order' ? 'active' : ''}`}
            onClick={() => setSelectedView('order')}
          >
            Execution Order
          </button>
        </div>
      </div>

      <SummaryCard summary={dynamicSummary} />

      <RegenerationOptions
        goal={goal}
        onRegenerate={onRegenerate}
        isRegenerating={isRegenerating}
      />

      {selectedView === 'tasks' ? (
        <div className="tasks-container">
          {breakdown.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isExpanded={expandedTaskId === task.id}
              onToggle={() => handleTaskToggle(task.id)}
              isCompleted={completionState[task.id]?.completed || false}
              onTaskComplete={() => toggleTaskCompletion(task.id)}
              subtaskCompletion={completionState[task.id]?.subtasks || {}}
              onSubtaskComplete={(index) => toggleSubtaskCompletion(task.id, index)}
            />
          ))}
        </div>
      ) : (
        <ExecutionOrder tasks={breakdown.tasks} />
      )}

      <div className="skill-legend">
        <div className="skill-legend-content">
          <div className="center">
            <h3>Skill Level Guide</h3>
            <div className="legend-items">
              {Object.values(SKILL_LEVELS).map((level) => (
                <div key={level.label} className="legend-item">
                  <span className="legend-icon">{level.icon}</span>
                  <span className="legend-label">{level.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="export-section-wrapper">
            <ExportButton
              goal={goal}
              breakdown={breakdown}
              completionState={completionState}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskBreakdown

