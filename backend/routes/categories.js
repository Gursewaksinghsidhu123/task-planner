const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const categoriesController = require('../controllers/categoriesController');

// Public routes — reading categories does not require authentication
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

// Protected routes — creating, updating, deleting requires valid JWT
router.post('/', authenticateToken, categoriesController.createCategory);
router.put('/:id', authenticateToken, categoriesController.updateCategory);
router.delete('/:id', authenticateToken, categoriesController.deleteCategory);

module.exports = router;
