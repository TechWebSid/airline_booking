const express = require('express');
const { getUsers, getUserById, updateUserProfile, deleteUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all users
router.get('/', authMiddleware, adminMiddleware, getUsers);

// Get user by ID
router.get('/:id', authMiddleware, getUserById);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Delete user
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
