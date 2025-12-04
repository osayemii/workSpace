import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useTheme } from '../contexts/ThemeContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TeamManagement from './TeamManagement';
import { FiPlus, FiLogOut, FiUsers, FiSun, FiMoon } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import './TaskList.css';

const TaskList = () => {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setTasks([]);
      return;
    }

    const allTasks = new Map();

    const updateTasks = () => {
      const tasksArray = Array.from(allTasks.values());
      tasksArray.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
        return dateB - dateA;
      });
      setTasks(tasksArray);
    };

    // Get tasks where user is owner
    const q1 = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    // Get tasks assigned to user
    const q2 = query(
      collection(db, 'tasks'),
      where('assignedTo', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe1 = onSnapshot(
      q1,
      (snapshot) => {
        snapshot.docs.forEach(doc => {
          allTasks.set(doc.id, { id: doc.id, ...doc.data() });
        });
        updateTasks();
      },
      (error) => {
        console.error('Error fetching user tasks:', error);
        // Fallback: try without orderBy if index is missing
        if (error.code === 'failed-precondition') {
          const fallbackQuery = query(
            collection(db, 'tasks'),
            where('userId', '==', auth.currentUser.uid)
          );
          onSnapshot(fallbackQuery, (snapshot) => {
            snapshot.docs.forEach(doc => {
              allTasks.set(doc.id, { id: doc.id, ...doc.data() });
            });
            updateTasks();
          });
        }
      }
    );

    const unsubscribe2 = onSnapshot(
      q2,
      (snapshot) => {
        snapshot.docs.forEach(doc => {
          allTasks.set(doc.id, { id: doc.id, ...doc.data() });
        });
        updateTasks();
      },
      (error) => {
        console.error('Error fetching assigned tasks:', error);
        // Fallback: try without orderBy if index is missing
        if (error.code === 'failed-precondition') {
          const fallbackQuery = query(
            collection(db, 'tasks'),
            where('assignedTo', '==', auth.currentUser.uid)
          );
          onSnapshot(fallbackQuery, (snapshot) => {
            snapshot.docs.forEach(doc => {
              allTasks.set(doc.id, { id: doc.id, ...doc.data() });
            });
            updateTasks();
          });
        }
      }
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [auth.currentUser?.uid]);

  const handleAddTask = async (taskData) => {
    try {
      if (!auth.currentUser) {
        console.error('User not authenticated');
        return;
      }

      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: auth.currentUser.uid,
        assignedTo: selectedUser || auth.currentUser.uid,
        createdAt: Timestamp.now(), // Use Firestore Timestamp for proper persistence
        status: 'pending',
        updatedAt: Timestamp.now()
      });
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setShowTeamManagement(false);
    setShowForm(true);
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        ...updates,
        updatedAt: Timestamp.now() // Track when task was last updated
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'inProgress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="task-list-container">
      <div className="task-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <p>Stay organized and productive</p>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button className="icon-button" onClick={() => setShowTeamManagement(true)} title="Team">
            <FiUsers />
          </button>
          <button className="icon-button" onClick={handleLogout} title="Logout">
            <FiLogOut />
          </button>
        </div>
      </div>

      <div className="task-stats">
        <div className="stat-card" onClick={() => setFilter('all')}>
          <div className="stat-number">{stats.all}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card" onClick={() => setFilter('pending')}>
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card" onClick={() => setFilter('inProgress')}>
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card" onClick={() => setFilter('completed')}>
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="task-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'inProgress' ? 'active' : ''}`}
            onClick={() => setFilter('inProgress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button className="add-task-btn" onClick={() => setShowForm(true)}>
          <FiPlus /> Add Task
        </button>
      </div>

      <div className="tasks-grid">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found. Create your first task!</p>
          </div>
        )}
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onClose={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
          assignedUser={selectedUser}
        />
      )}

      {showTeamManagement && (
        <TeamManagement
          onClose={() => setShowTeamManagement(false)}
          onUserSelect={handleUserSelect}
        />
      )}
    </div>
  );
};

export default TaskList;

