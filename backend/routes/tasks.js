const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const tasksController = require('../controllers/tasksController');

// All task routes are protected — valid JWT required
// More specific routes are defined first to avoid conflicts with /:id
router.get('/', authenticateToken, tasksController.getAllTasks);
router.get('/user/:userId/status/:status', authenticateToken, tasksController.getTasksByStatus);
router.get('/user/:userId/category/:categoryId', authenticateToken, tasksController.getTasksByCategory);
router.get('/user/:userId', authenticateToken, tasksController.getTasksByUser);
router.get('/:id', authenticateToken, tasksController.getTaskById);

router.post('/', authenticateToken, tasksController.createTask);
router.put('/:id', authenticateToken, tasksController.updateTask);
router.patch('/:id/complete', authenticateToken, tasksController.completeTask);
router.delete('/:id', authenticateToken, tasksController.deleteTask);

module.exports = router;
