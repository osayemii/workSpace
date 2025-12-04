import { useState } from 'react';
import { FiEdit2, FiTrash2, FiClock, FiUser } from 'react-icons/fi';
import './TaskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus });
  };

  const handleSave = () => {
    onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981'; // Green
      case 'inProgress':
        return '#06b6d4'; // Cyan (accent color)
      case 'pending':
        return '#f59e0b'; // Amber
      default:
        return '#6b7280'; // Gray
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="task-card" style={{ borderLeftColor: getStatusColor(task.status) }}>
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-textarea"
            rows="3"
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit"
              >
                <FiEdit2 />
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(task.id)}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            {task.createdAt && (
              <div className="meta-item">
                <FiClock />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            )}
            {task.assignedTo && (
              <div className="meta-item">
                <FiUser />
                <span>{task.assignedTo}</span>
              </div>
            )}
          </div>

          <div className="task-status">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
              style={{ color: getStatusColor(task.status) }}
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;


