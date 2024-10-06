const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', register); // POST route for user registration, handled by `register` function in controller
router.post('/login', login); // POST route for user login, handled by `login` function in controller
router.get('/profile', authMiddleware, getProfile); // GET route for user profile, protected by `authMiddleware`, handled by `getProfile`

module.exports = router;
