import './ExportButton.css'
import { exportToJSON, exportToCSV, exportToJira, exportToMarkdown, exportToExcel } from '../utils/exportUtils'

function ExportButton({ goal, breakdown, completionState }) {
  const exportOptions = [
    { label: 'JSON', icon: '📄', handler: () => exportToJSON(goal, breakdown, completionState) },
    { label: 'CSV', icon: '📊', handler: () => exportToCSV(goal, breakdown, completionState) },
    { label: 'Excel', icon: '📈', handler: () => exportToExcel(goal, breakdown, completionState) },
    { label: 'Jira', icon: '🎯', handler: () => exportToJira(goal, breakdown, completionState) },
    { label: 'Markdown', icon: '📝', handler: () => exportToMarkdown(goal, breakdown, completionState) }
  ]

  return (
    <div className="export-section">
      <h4 className="export-title">Export Options</h4>
      <div className="export-buttons-container">
        {exportOptions.map((option) => (
          <button
            key={option.label}
            className="export-option-button"
            onClick={option.handler}
            aria-label={`Export to ${option.label}`}
            title={`Export to ${option.label}`}
          >
            <span className="export-option-icon">{option.icon}</span>
            <span className="export-option-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExportButton

