import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import './TaskForm.css';

const TaskForm = ({ onSubmit, onClose, assignedUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      status: 'pending'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    
    // Close the form after submission
    onClose();
  };

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>Create New Task</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {assignedUser && (
            <div className="assigned-notice">
              This task will be assigned to a team member
            </div>
          )}
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

