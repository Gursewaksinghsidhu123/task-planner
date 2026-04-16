import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getTasksByUser } from '../services/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasksByUser(user.id)
        setTasks(res.data)
      } catch (err) {
        setError('Could not load tasks.')
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchTasks()
  }, [user])

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length

  const upcomingTasks = tasks
    .filter((t) => t.status !== 'completed' && t.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5)

  const priorityColor = (priority) => {
    if (priority === 'high') return '#ef4444'
    if (priority === 'medium') return '#f59e0b'
    return '#22c55e'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date'
    return new Date(dateStr).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1>Hey, {user?.username} 👋</h1>
          <p className="page-subtitle">Here&apos;s an overview of your tasks</p>
        </div>
        <Link to="/tasks" className="btn btn-primary">
          + New Task
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading your tasks...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-card stat-pending">
              <span className="stat-number">{pendingTasks}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card stat-progress">
              <span className="stat-number">{inProgressTasks}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card stat-done">
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2>Upcoming Tasks</h2>
              <Link to="/tasks" className="link-muted">View all →</Link>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="empty-state">
                <p>No upcoming tasks. <Link to="/tasks">Add one now!</Link></p>
              </div>
            ) : (
              <div className="task-list">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="task-row">
                    <div className="task-row-left">
                      <span
                        className="priority-dot"
                        style={{ backgroundColor: priorityColor(task.priority) }}
                      />
                      <div>
                        <p className="task-row-title">{task.title}</p>
                        <p className="task-row-meta">
                          {task.category_name && (
                            <span
                              className="category-pill"
                              style={{ backgroundColor: task.category_color + '22', color: task.category_color }}
                            >
                              {task.category_name}
                            </span>
                          )}
                          <span>{formatDate(task.due_date)}</span>
                        </p>
                      </div>
                    </div>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
