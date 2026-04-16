import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTasksByUser, deleteTask, completeTask, getCategories } from '../services/api'
import TaskForm from '../components/TaskForm'

export default function Tasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const loadTasks = async () => {
    try {
      const res = await getTasksByUser(user.id)
      setTasks(res.data)
    } catch (err) {
      setError('Failed to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksRes, catsRes] = await Promise.all([
          getTasksByUser(user.id),
          getCategories(),
        ])
        setTasks(tasksRes.data)
        setCategories(catsRes.data)
      } catch (err) {
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }

    if (user) loadData()
  }, [user])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError('Failed to delete task.')
    }
  }

  const handleToggleComplete = async (task) => {
    const newCompleted = !task.completed
    try {
      const res = await completeTask(task.id, newCompleted)
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...res.data.task } : t))
      )
    } catch (err) {
      setError('Failed to update task.')
    }
  }

  const handleFormSave = () => {
    setShowForm(false)
    setEditingTask(null)
    loadTasks()
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const filtered = tasks.filter((t) => {
    const statusMatch = filterStatus === 'all' || t.status === filterStatus
    const priorityMatch = filterPriority === 'all' || t.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const priorityColor = (p) => {
    if (p === 'high') return '#ef4444'
    if (p === 'medium') return '#f59e0b'
    return '#22c55e'
  }

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1>My Tasks</h1>
          <p className="page-subtitle">{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { setEditingTask(null); setShowForm(true) }}
        >
          + Add Task
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingTask ? 'Edit Task' : 'New Task'}</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <TaskForm
              task={editingTask}
              userId={user.id}
              categories={categories}
              onSave={handleFormSave}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="filters">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found. Try adjusting the filters or adding a new task.</p>
        </div>
      ) : (
        <div className="task-cards">
          {filtered.map((task) => (
            <div key={task.id} className={`task-card ${task.completed ? 'task-done' : ''}`}>
              <div className="task-card-top">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  title="Mark complete"
                />
                <div className="task-card-info">
                  <h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                </div>
              </div>

              <div className="task-card-meta">
                <span
                  className="priority-tag"
                  style={{ color: priorityColor(task.priority), borderColor: priorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className={`status-badge status-${task.status}`}>{task.status}</span>
                {task.category_name && (
                  <span
                    className="category-pill"
                    style={{ backgroundColor: task.category_color + '22', color: task.category_color }}
                  >
                    {task.category_name}
                  </span>
                )}
                {task.due_date && (
                  <span className="due-date">📅 {formatDate(task.due_date)}</span>
                )}
              </div>

              <div className="task-card-actions">
                <button className="btn btn-sm btn-outline" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
