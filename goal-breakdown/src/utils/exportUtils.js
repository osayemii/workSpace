// Export utility functions for different formats

export function exportToJSON(goal, breakdown, completionState) {
  const exportData = {
    goal,
    summary: breakdown.summary,
    tasks: breakdown.tasks.map(task => ({
      id: task.id,
      order: task.order,
      title: task.title,
      description: task.description,
      effort: task.effort.label,
      skillLevel: task.skillLevel.label,
      dependencies: task.dependencies,
      completed: completionState[task.id]?.completed || false,
      subtasks: task.subtasks.map((subtask, index) => ({
        title: subtask.title,
        effort: subtask.effort.label,
        skillLevel: subtask.skillLevel.label,
        completed: completionState[task.id]?.subtasks?.[index] || false
      }))
    })),
    exportedAt: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `goal-breakdown-${sanitizeFileName(goal)}-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToCSV(goal, breakdown, completionState) {
  const rows = []
  
  // Header
  rows.push(['Task Order', 'Task Title', 'Task Description', 'Task Effort', 'Task Skill Level', 'Task Completed', 'Subtask Order', 'Subtask Title', 'Subtask Effort', 'Subtask Skill Level', 'Subtask Completed', 'Dependencies'].join(','))
  
  // Data rows
  breakdown.tasks.forEach(task => {
    const taskCompleted = completionState[task.id]?.completed ? 'Yes' : 'No'
    const taskRow = [
      task.order,
      escapeCSV(task.title),
      escapeCSV(task.description),
      task.effort.label,
      task.skillLevel.label,
      taskCompleted,
      '',
      '',
      '',
      '',
      '',
      task.dependencies.join('; ')
    ]
    
    if (task.subtasks.length === 0) {
      rows.push(taskRow.join(','))
    } else {
      task.subtasks.forEach((subtask, index) => {
        const subtaskCompleted = completionState[task.id]?.subtasks?.[index] ? 'Yes' : 'No'
        const row = [
          task.order,
          escapeCSV(task.title),
          escapeCSV(task.description),
          task.effort.label,
          task.skillLevel.label,
          taskCompleted,
          index + 1,
          escapeCSV(subtask.title),
          subtask.effort.label,
          subtask.skillLevel.label,
          subtaskCompleted,
          task.dependencies.join('; ')
        ]
        rows.push(row.join(','))
      })
    }
  })
  
  const csvContent = rows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `goal-breakdown-${sanitizeFileName(goal)}-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToJira(goal, breakdown, completionState) {
  // Jira CSV import format
  const rows = []
  
  // Jira CSV header
  rows.push(['Summary', 'Issue Type', 'Description', 'Priority', 'Labels', 'Parent', 'Status'].join(','))
  
  breakdown.tasks.forEach(task => {
    const taskStatus = completionState[task.id]?.completed ? 'Done' : 'To Do'
    const priority = getJiraPriority(task.effort.value)
    const labels = [task.skillLevel.label, task.effort.label].join(';')
    
    // Main task
    const taskRow = [
      escapeCSV(task.title),
      'Task',
      escapeCSV(task.description),
      priority,
      labels,
      '',
      taskStatus
    ]
    rows.push(taskRow.join(','))
    
    // Subtasks
    task.subtasks.forEach((subtask, index) => {
      const subtaskStatus = completionState[task.id]?.subtasks?.[index] ? 'Done' : 'To Do'
      const subtaskPriority = getJiraPriority(subtask.effort.value)
      const subtaskLabels = [subtask.skillLevel.label, subtask.effort.label].join(';')
      
      const subtaskRow = [
        escapeCSV(subtask.title),
        'Sub-task',
        '',
        subtaskPriority,
        subtaskLabels,
        escapeCSV(task.title), // Parent task
        subtaskStatus
      ]
      rows.push(subtaskRow.join(','))
    })
  })
  
  const csvContent = rows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `jira-import-${sanitizeFileName(goal)}-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToMarkdown(goal, breakdown, completionState) {
  let markdown = `# ${goal}\n\n`
  markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`
  
  // Summary
  markdown += `## Project Summary\n\n`
  markdown += `- Total Tasks: ${breakdown.summary.totalTasks}\n`
  markdown += `- Total Sub-tasks: ${breakdown.summary.totalSubtasks}\n`
  markdown += `- Estimated Weeks: ${breakdown.summary.estimatedWeeks}\n`
  markdown += `- Total Effort Points: ${breakdown.summary.totalEffort}\n\n`
  
  if (completionState && Object.keys(completionState).length > 0) {
    const completedTasks = breakdown.tasks.filter(t => completionState[t.id]?.completed).length
    const completedSubtasks = breakdown.tasks.reduce((sum, task) => {
      const taskSubtasks = completionState[task.id]?.subtasks || {}
      return sum + Object.values(taskSubtasks).filter(Boolean).length
    }, 0)
    markdown += `- Completed Tasks: ${completedTasks}/${breakdown.summary.totalTasks}\n`
    markdown += `- Completed Sub-tasks: ${completedSubtasks}/${breakdown.summary.totalSubtasks}\n\n`
  }
  
  // Tasks
  markdown += `## Tasks\n\n`
  breakdown.tasks.forEach(task => {
    const isCompleted = completionState[task.id]?.completed
    const checkbox = isCompleted ? '- [x]' : '- [ ]'
    markdown += `${checkbox} **Task ${task.order}: ${task.title}**\n`
    markdown += `  - *${task.description}*\n`
    markdown += `  - Effort: ${task.effort.label} | Skill: ${task.skillLevel.label}\n`
    
    if (task.dependencies.length > 0) {
      markdown += `  - Depends on: Tasks ${task.dependencies.join(', ')}\n`
    }
    
    if (task.subtasks.length > 0) {
      markdown += `  - Sub-tasks:\n`
      task.subtasks.forEach((subtask, index) => {
        const isSubtaskCompleted = completionState[task.id]?.subtasks?.[index]
        const subtaskCheckbox = isSubtaskCompleted ? '    - [x]' : '    - [ ]'
        markdown += `${subtaskCheckbox} ${subtask.title} (${subtask.effort.label} effort, ${subtask.skillLevel.label})\n`
      })
    }
    markdown += '\n'
  })
  
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `goal-breakdown-${sanitizeFileName(goal)}-${Date.now()}.md`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToExcel(goal, breakdown, completionState) {
  // Excel-compatible CSV with BOM for UTF-8
  const rows = []
  
  // Header
  rows.push(['Task Order', 'Task Title', 'Task Description', 'Task Effort', 'Task Skill Level', 'Task Completed', 'Subtask Order', 'Subtask Title', 'Subtask Effort', 'Subtask Skill Level', 'Subtask Completed', 'Dependencies'].join('\t'))
  
  // Data rows
  breakdown.tasks.forEach(task => {
    const taskCompleted = completionState[task.id]?.completed ? 'Yes' : 'No'
    
    if (task.subtasks.length === 0) {
      const taskRow = [
        task.order,
        task.title,
        task.description,
        task.effort.label,
        task.skillLevel.label,
        taskCompleted,
        '',
        '',
        '',
        '',
        '',
        task.dependencies.join('; ')
      ]
      rows.push(taskRow.join('\t'))
    } else {
      task.subtasks.forEach((subtask, index) => {
        const subtaskCompleted = completionState[task.id]?.subtasks?.[index] ? 'Yes' : 'No'
        const row = [
          task.order,
          task.title,
          task.description,
          task.effort.label,
          task.skillLevel.label,
          taskCompleted,
          index + 1,
          subtask.title,
          subtask.effort.label,
          subtask.skillLevel.label,
          subtaskCompleted,
          task.dependencies.join('; ')
        ]
        rows.push(row.join('\t'))
      })
    }
  })
  
  const excelContent = '\ufeff' + rows.join('\n') // BOM for UTF-8
  const blob = new Blob([excelContent], { type: 'text/tab-separated-values;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `goal-breakdown-${sanitizeFileName(goal)}-${Date.now()}.tsv`
  a.click()
  URL.revokeObjectURL(url)
}

// Helper functions
function escapeCSV(value) {
  if (value === null || value === undefined) return ''
  const stringValue = String(value)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

function sanitizeFileName(name) {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50)
}

function getJiraPriority(effortValue) {
  // Map effort to Jira priority
  if (effortValue >= 4) return 'Highest'
  if (effortValue >= 3) return 'High'
  if (effortValue >= 2) return 'Medium'
  return 'Low'
}

