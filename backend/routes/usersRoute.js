const express = require('express');
const router = express.Router();
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, getUsers);

module.exports = router;
