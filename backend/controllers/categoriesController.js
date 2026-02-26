const pool = require('../config/database');

// GET / - Return all categories sorted alphabetically
const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error while fetching categories' });
  }
};

// GET /:id - Return a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Server error while fetching category' });
  }
};

// POST / - Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    // Category name is required
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const result = await pool.query(
      'INSERT INTO categories (name, color) VALUES ($1, $2) RETURNING *',
      [name, color || '#3B82F6']
    );

    res.status(201).json({
      message: 'Category created successfully',
      category: result.rows[0]
    });
  } catch (error) {
    // Handle unique constraint violation (duplicate category name)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Category already exists' });
    }
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error while creating category' });
  }
};

// PUT /:id - Update a category's name and/or color
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const result = await pool.query(
      `UPDATE categories
       SET name = COALESCE($1, name),
           color = COALESCE($2, color)
       WHERE id = $3
       RETURNING *`,
      [name, color, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
      message: 'Category updated successfully',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Server error while updating category' });
  }
};

// DELETE /:id - Remove a category (tasks with this category will have category_id set to NULL)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
      message: 'Category deleted successfully',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Server error while deleting category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
