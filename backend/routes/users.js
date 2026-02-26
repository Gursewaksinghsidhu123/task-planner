const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const usersController = require('../controllers/usersController');

// Public routes (no token required)
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Protected routes (valid JWT required)
router.get('/', authenticateToken, usersController.getAllUsers);
router.get('/:id', authenticateToken, usersController.getUserById);
router.put('/:id', authenticateToken, usersController.updateUser);
router.delete('/:id', authenticateToken, usersController.deleteUser);

module.exports = router;
