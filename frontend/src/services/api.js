import axios from 'axios'

// Base URL points to the deployed backend on Render
const API_URL = import.meta.env.VITE_API_URL || 'https://task-planner-api-hu8d.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the JWT token to every request if it exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the server responds with 401, clear local storage and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// --- Auth ---
export const registerUser = (data) => api.post('/users/register', data)
export const loginUser = (data) => api.post('/users/login', data)

// --- Tasks ---
export const getAllTasks = () => api.get('/tasks')
export const getTasksByUser = (userId) => api.get(`/tasks/user/${userId}`)
export const getTaskById = (id) => api.get(`/tasks/${id}`)
export const createTask = (data) => api.post('/tasks', data)
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data)
export const completeTask = (id, completed) => api.patch(`/tasks/${id}/complete`, { completed })
export const deleteTask = (id) => api.delete(`/tasks/${id}`)

// --- Categories ---
export const getCategories = () => api.get('/categories')
export const getCategoryById = (id) => api.get(`/categories/${id}`)
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

export default api
