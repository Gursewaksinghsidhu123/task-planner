const pool = require('../config/database');

// GET / - Return all tasks with their category info (JOIN)
const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       ORDER BY t.due_date ASC, t.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get all tasks error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// GET /user/:userId - Return all tasks belonging to a specific user
const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = $1
       ORDER BY t.due_date ASC, t.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks by user error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// GET /user/:userId/status/:status - Filter a user's tasks by status
const getTasksByStatus = async (req, res) => {
  try {
    const { userId, status } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = $1 AND t.status = $2
       ORDER BY t.due_date ASC`,
      [userId, status]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks by status error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// GET /user/:userId/category/:categoryId - Filter a user's tasks by category
const getTasksByCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = $1 AND t.category_id = $2
       ORDER BY t.due_date ASC`,
      [userId, categoryId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks by category error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// GET /:id - Return a single task by its ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error while fetching task' });
  }
};

// POST / - Create a new task for a user
const createTask = async (req, res) => {
  try {
    const { user_id, category_id, title, description, due_date, priority, status } = req.body;

    // Both user_id and title are required
    if (!user_id || !title) {
      return res.status(400).json({ error: 'User ID and title are required' });
    }

    const result = await pool.query(
      `INSERT INTO tasks (user_id, category_id, title, description, due_date, priority, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        user_id,
        category_id || null,
        title,
        description || null,
        due_date || null,
        priority || 'medium',
        status || 'pending'
      ]
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error while creating task' });
  }
};

// PUT /:id - Update an existing task's fields
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, title, description, due_date, priority, status, completed } = req.body;

    // Verify the task exists before updating
    const checkTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (checkTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Use COALESCE so only provided fields are updated
    const result = await pool.query(
      `UPDATE tasks
       SET category_id = COALESCE($1, category_id),
           title = COALESCE($2, title),
           description = COALESCE($3, description),
           due_date = COALESCE($4, due_date),
           priority = COALESCE($5, priority),
           status = COALESCE($6, status),
           completed = COALESCE($7, completed),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [category_id, title, description, due_date, priority, status, completed, id]
    );

    res.json({
      message: 'Task updated successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

// PATCH /:id/complete - Toggle a task's completed status
const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET completed = $1,
           status = CASE WHEN $1 = true THEN 'completed' ELSE status END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task completion status updated',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

// DELETE /:id - Remove a task from the database
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};

module.exports = {
  getAllTasks,
  getTasksByUser,
  getTasksByStatus,
  getTasksByCategory,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  deleteTask
};
