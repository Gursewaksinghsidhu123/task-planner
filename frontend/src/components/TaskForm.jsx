import { useState } from 'react'
import { createTask, updateTask } from '../services/api'

export default function TaskForm({ task, userId, categories, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [dueDate, setDueDate] = useState(task?.due_date ? task.due_date.split('T')[0] : '')
  const [priority, setPriority] = useState(task?.priority || 'medium')
  const [status, setStatus] = useState(task?.status || 'pending')
  const [categoryId, setCategoryId] = useState(task?.category_id || '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title is required.')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      user_id: userId,
      title,
      description,
      due_date: dueDate || null,
      priority,
      status,
      category_id: categoryId || null,
    }

    try {
      if (task) {
        await updateTask(task.id, payload)
      } else {
        await createTask(payload)
      }
      onSave()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Optional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
