// Goal analysis utility that breaks down high-level goals into actionable tasks

const EFFORT_LEVELS = {
  LOW: { label: 'Low', value: 1, color: '#4ade80' },
  MEDIUM: { label: 'Medium', value: 2, color: '#fbbf24' },
  HIGH: { label: 'High', value: 3, color: '#f87171' },
  VERY_HIGH: { label: 'Very High', value: 4, color: '#ef4444' }
}

const SKILL_LEVELS = {
  INTERN: { label: 'Intern', color: '#93c5fd', icon: '🌱' },
  JUNIOR: { label: 'Junior', color: '#60a5fa', icon: '👨‍💻' },
  SENIOR: { label: 'Senior', color: '#3b82f6', icon: '👨‍💼' },
  LEADERSHIP: { label: 'Leadership', color: '#1e40af', icon: '👔' }
}

// Extract keywords and context from goal text
function extractGoalContext(goalText) {
  const lower = goalText.toLowerCase()
  
  const context = {
    hasDeadline: /by|before|until|deadline|due/.test(lower),
    hasPercentage: /(\d+)%/.test(goalText),
    hasDate: /\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i.test(goalText),
    isFeature: /feature|product|launch|release|deploy/.test(lower),
    isPerformance: /performance|speed|time|efficiency|optimize|reduce|improve/.test(lower),
    isQuality: /quality|satisfaction|score|rating|improve/.test(lower),
    isTechnical: /code|system|architecture|infrastructure|api|database/.test(lower),
    isBusiness: /customer|user|revenue|sales|market|business/.test(lower)
  }
  
  return context
}

// Generate tasks based on goal context
function generateTasks(goalText, context, options = {}) {
  const { 
    detailLevel = 'normal', // 'more-detailed', 'normal', 'simpler'
    timelineStyle = 'normal' // 'aggressive', 'normal', 'conservative'
  } = options
  
  const tasks = []
  
  // Adjust effort multipliers based on timeline style
  const timelineMultiplier = {
    aggressive: 0.7, // Reduce effort estimates
    normal: 1.0,
    conservative: 1.4 // Increase effort estimates
  }
  
  const multiplier = timelineMultiplier[timelineStyle] || 1.0
  
  // Helper to get subtasks based on detail level
  const getSubtasks = (baseSubtasks, detailLevel) => {
    if (detailLevel === 'more-detailed') {
      // Add more granular subtasks
      const additional = [
        { title: 'Review and validate requirements', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR },
        { title: 'Document assumptions and constraints', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
        { title: 'Set up tracking and monitoring', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR }
      ]
      return [...baseSubtasks, ...additional]
    } else if (detailLevel === 'simpler') {
      // Keep only essential subtasks (first 2-3)
      return baseSubtasks.slice(0, Math.max(2, Math.ceil(baseSubtasks.length * 0.5)))
    }
    return baseSubtasks
  }

  if (context.isFeature && context.hasDeadline) {
    // Feature launch scenario
    const baseSubtasks1 = [
      { title: 'Gather stakeholder requirements', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP },
      { title: 'Create user stories and acceptance criteria', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR },
      { title: 'Define technical specifications', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
      { title: 'Create project timeline and milestones', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.LEADERSHIP }
    ]
    
    tasks.push(
      {
        id: 1,
        title: 'Requirements & Planning',
        description: 'Define feature specifications, user stories, and acceptance criteria',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.LEADERSHIP,
        order: 1,
        dependencies: [],
        subtasks: getSubtasks(baseSubtasks1, detailLevel)
      },
      {
        id: 2,
        title: 'Design & Architecture',
        description: 'Create UI/UX designs and system architecture',
        effort: EFFORT_LEVELS.HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 2,
        dependencies: [1],
        subtasks: getSubtasks([
          { title: 'Create wireframes and mockups', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Design system architecture', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Review and approve designs', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Set up development environment', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR }
        ], detailLevel)
      },
      {
        id: 3,
        title: 'Development - Core Features',
        description: 'Implement main functionality and business logic',
        effort: EFFORT_LEVELS.VERY_HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 3,
        dependencies: [2],
        subtasks: getSubtasks([
          { title: 'Implement core business logic', effort: EFFORT_LEVELS.VERY_HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Create API endpoints', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Build frontend components', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Integrate with existing systems', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 4,
        title: 'Testing & Quality Assurance',
        description: 'Write tests and perform quality checks',
        effort: EFFORT_LEVELS.HIGH,
        skillLevel: SKILL_LEVELS.JUNIOR,
        order: 4,
        dependencies: [3],
        subtasks: getSubtasks([
          { title: 'Write unit tests', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Write integration tests', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Perform manual testing', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN },
          { title: 'Fix bugs and issues', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR }
        ], detailLevel)
      },
      {
        id: 5,
        title: 'Documentation & Deployment',
        description: 'Create documentation and deploy to production',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 5,
        dependencies: [4],
        subtasks: getSubtasks([
          { title: 'Write technical documentation', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Create user documentation', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN },
          { title: 'Deploy to staging environment', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Perform final testing in staging', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Deploy to production', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP }
        ], detailLevel)
      }
    )
  } else if (context.isPerformance) {
    // Performance optimization scenario
    tasks.push(
      {
        id: 1,
        title: 'Performance Analysis',
        description: 'Identify bottlenecks and measure current performance',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 1,
        dependencies: [],
        subtasks: getSubtasks([
          { title: 'Profile application performance', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Identify bottlenecks and slow queries', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Measure baseline metrics', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Document current performance issues', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN }
        ], detailLevel)
      },
      {
        id: 2,
        title: 'Optimization Strategy',
        description: 'Develop optimization plan and prioritize improvements',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.LEADERSHIP,
        order: 2,
        dependencies: [1],
        subtasks: getSubtasks([
          { title: 'Prioritize optimization opportunities', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Design optimization approach', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Estimate impact and effort', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 3,
        title: 'Implementation',
        description: 'Implement performance optimizations',
        effort: EFFORT_LEVELS.VERY_HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 3,
        dependencies: [2],
        subtasks: getSubtasks([
          { title: 'Optimize database queries', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Implement caching strategies', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Optimize code and algorithms', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Optimize frontend assets', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Implement lazy loading', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR }
        ], detailLevel)
      },
      {
        id: 4,
        title: 'Testing & Validation',
        description: 'Verify performance improvements',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.JUNIOR,
        order: 4,
        dependencies: [3],
        subtasks: getSubtasks([
          { title: 'Run performance tests', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Compare before/after metrics', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN },
          { title: 'Validate target performance goals', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 5,
        title: 'Deployment & Monitoring',
        description: 'Deploy optimizations and set up monitoring',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 5,
        dependencies: [4],
        subtasks: getSubtasks([
          { title: 'Deploy to production', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Set up performance monitoring', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Document optimization changes', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN }
        ], detailLevel)
      }
    )
  } else if (context.isQuality) {
    // Quality improvement scenario
    tasks.push(
      {
        id: 1,
        title: 'Current State Assessment',
        description: 'Evaluate current quality metrics and identify gaps',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 1,
        dependencies: [],
        subtasks: getSubtasks([
          { title: 'Collect current satisfaction data', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN },
          { title: 'Analyze customer feedback', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Identify quality gaps', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 2,
        title: 'Improvement Strategy',
        description: 'Develop plan to address quality issues',
        effort: EFFORT_LEVELS.HIGH,
        skillLevel: SKILL_LEVELS.LEADERSHIP,
        order: 2,
        dependencies: [1],
        subtasks: getSubtasks([
          { title: 'Define improvement initiatives', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Prioritize improvement areas', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Set measurable targets', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 3,
        title: 'Implementation',
        description: 'Execute improvement initiatives',
        effort: EFFORT_LEVELS.VERY_HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 3,
        dependencies: [2],
        subtasks: getSubtasks([
          { title: 'Improve product/service quality', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Enhance customer support processes', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Implement feedback collection system', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Train team on quality standards', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN }
        ], detailLevel)
      },
      {
        id: 4,
        title: 'Monitoring & Measurement',
        description: 'Track progress toward quality goals',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.JUNIOR,
        order: 4,
        dependencies: [3],
        subtasks: getSubtasks([
          { title: 'Set up quality metrics dashboard', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Collect and analyze feedback', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN },
          { title: 'Report on progress', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR }
        ], detailLevel)
      }
    )
  } else {
    // Generic goal breakdown
    tasks.push(
      {
        id: 1,
        title: 'Planning & Analysis',
        description: 'Understand requirements and create plan',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.LEADERSHIP,
        order: 1,
        dependencies: [],
        subtasks: getSubtasks([
          { title: 'Define objectives and success criteria', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Analyze current state', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Create project plan', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      },
      {
        id: 2,
        title: 'Design & Preparation',
        description: 'Design solution and prepare resources',
        effort: EFFORT_LEVELS.HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 2,
        dependencies: [1],
        subtasks: getSubtasks([
          { title: 'Design solution approach', effort: EFFORT_LEVELS.HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Allocate resources', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.LEADERSHIP },
          { title: 'Set up tools and environment', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR }
        ], detailLevel)
      },
      {
        id: 3,
        title: 'Execution',
        description: 'Implement the solution',
        effort: EFFORT_LEVELS.VERY_HIGH,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 3,
        dependencies: [2],
        subtasks: getSubtasks([
          { title: 'Execute main work', effort: EFFORT_LEVELS.VERY_HIGH, skillLevel: SKILL_LEVELS.SENIOR },
          { title: 'Support tasks', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Documentation', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.INTERN }
        ], detailLevel)
      },
      {
        id: 4,
        title: 'Validation & Deployment',
        description: 'Test and deploy solution',
        effort: EFFORT_LEVELS.MEDIUM,
        skillLevel: SKILL_LEVELS.SENIOR,
        order: 4,
        dependencies: [3],
        subtasks: getSubtasks([
          { title: 'Test solution', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Fix issues', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.JUNIOR },
          { title: 'Deploy to production', effort: EFFORT_LEVELS.MEDIUM, skillLevel: SKILL_LEVELS.SENIOR }
        ], detailLevel)
      }
    )
  }
  
  return tasks
}

// Helper function to adjust tasks based on detail level
function adjustTaskDetail(tasks, detailLevel) {
  if (detailLevel === 'more-detailed') {
    // Add more subtasks to each task
    return tasks.map(task => {
      const additionalSubtasks = [
        { title: 'Review and refine approach', effort: EFFORT_LEVELS.LOW, skillLevel: task.skillLevel },
        { title: 'Document progress and decisions', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.JUNIOR },
        { title: 'Coordinate with team members', effort: EFFORT_LEVELS.LOW, skillLevel: SKILL_LEVELS.SENIOR }
      ]
      return {
        ...task,
        subtasks: [...task.subtasks, ...additionalSubtasks.slice(0, 2)]
      }
    })
  } else if (detailLevel === 'simpler') {
    // Reduce subtasks, keep only essential ones
    return tasks.map(task => ({
      ...task,
      subtasks: task.subtasks.slice(0, Math.max(2, Math.floor(task.subtasks.length * 0.6)))
    }))
  }
  return tasks
}

// Helper function to adjust timeline estimates
function adjustTimeline(totalEffort, timelineStyle) {
  const multipliers = {
    aggressive: 0.6, // 40% faster
    normal: 1.0,
    conservative: 1.5 // 50% more time
  }
  
  const multiplier = multipliers[timelineStyle] || 1.0
  const estimatedDays = Math.ceil(totalEffort * 1.5 * multiplier)
  const estimatedWeeks = Math.ceil(estimatedDays / 5)
  
  return { estimatedDays, estimatedWeeks }
}

// Main analysis function
export function analyzeGoal(goalText, options = {}) {
  const { 
    detailLevel = 'normal',
    timelineStyle = 'normal'
  } = options
  
  const context = extractGoalContext(goalText)
  // generateTasks already applies detailLevel via getSubtasks
  const tasks = generateTasks(goalText, context, options)
  
  // Calculate total effort
  const totalEffort = tasks.reduce((sum, task) => {
    const taskEffort = task.effort.value
    const subtaskEffort = task.subtasks.reduce((s, st) => s + st.effort.value, 0)
    return sum + taskEffort + subtaskEffort
  }, 0)
  
  // Adjust timeline based on style
  const { estimatedDays, estimatedWeeks } = adjustTimeline(totalEffort, timelineStyle)
  
  return {
    goal: goalText,
    context,
    tasks,
    summary: {
      totalTasks: tasks.length,
      totalSubtasks: tasks.reduce((sum, t) => sum + t.subtasks.length, 0),
      totalEffort,
      estimatedDays,
      estimatedWeeks
    }
  }
}

export { EFFORT_LEVELS, SKILL_LEVELS }

