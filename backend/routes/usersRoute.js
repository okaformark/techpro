const express = require('express');
const router = express.Router();
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, admin, getUsers);

module.exports = router;
