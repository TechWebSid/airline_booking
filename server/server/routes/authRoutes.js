const express = require('express');
const { registerUser, authUser,utheProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate user and get token
router.post('/login', authUser);
router.get('/profile',authMiddleware, utheProfile);

module.exports = router;
