import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingCat, setEditingCat] = useState(null)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [saving, setSaving] = useState(false)

  const loadCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (err) {
      setError('Failed to load categories.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const openAdd = () => {
    setEditingCat(null)
    setName('')
    setColor('#3B82F6')
    setShowForm(true)
  }

  const openEdit = (cat) => {
    setEditingCat(cat)
    setName(cat.name)
    setColor(cat.color)
    setShowForm(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    try {
      if (editingCat) {
        await updateCategory(editingCat.id, { name, color })
      } else {
        await createCategory({ name, color })
      }
      setShowForm(false)
      await loadCategories()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save category.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Tasks using it will not be deleted.')) return
    try {
      await deleteCategory(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete category.')
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1>Categories</h1>
          <p className="page-subtitle">Organize your tasks by category</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          + Add Category
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCat ? 'Edit Category' : 'New Category'}</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="auth-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Homework"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <span className="color-preview" style={{ backgroundColor: color }}>
                    {name || 'Preview'}
                  </span>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="empty-state">
          <p>No categories yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-color-bar" style={{ backgroundColor: cat.color }} />
              <div className="category-body">
                <h3>{cat.name}</h3>
                <p className="color-code">{cat.color}</p>
              </div>
              <div className="category-actions">
                <button className="btn btn-sm btn-outline" onClick={() => openEdit(cat)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
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
