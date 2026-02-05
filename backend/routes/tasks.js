const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all tasks for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name as category_name, c.color as category_color 
       FROM tasks t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = $1 
       ORDER BY t.due_date ASC, t.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
});

// GET single task by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name as category_name, c.color as category_color 
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
});

// POST create new task
router.post('/', async (req, res) => {
  try {
    const { user_id, category_id, title, description, due_date, priority, status } = req.body;

    // Validate required fields
    if (!user_id || !title) {
      return res.status(400).json({ error: 'User ID and title are required' });
    }

    const result = await pool.query(
      `INSERT INTO tasks (user_id, category_id, title, description, due_date, priority, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [user_id, category_id || null, title, description || null, due_date || null, priority || 'medium', status || 'pending']
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: result.rows[0]
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error while creating task' });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, title, description, due_date, priority, status, completed } = req.body;

    // Check if task exists
    const checkTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (checkTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

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
});

// PATCH mark task as completed
router.patch('/:id/complete', async (req, res) => {
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
});

// DELETE task
router.delete('/:id', async (req, res) => {
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
});

// GET tasks by status
router.get('/user/:userId/status/:status', async (req, res) => {
  try {
    const { userId, status } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name as category_name, c.color as category_color 
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
});

// GET tasks by category
router.get('/user/:userId/category/:categoryId', async (req, res) => {
  try {
    const { userId, categoryId } = req.params;

    const result = await pool.query(
      `SELECT t.*, c.name as category_name, c.color as category_color 
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
});

module.exports = router;
