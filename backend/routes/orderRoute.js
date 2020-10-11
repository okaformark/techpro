const express = require('express');
const {
	getOrderById,
	addOrderItems,
	updatePaidStatus,
} = require('../controllers/orderController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').get(protect, updatePaidStatus);

module.exports = router;
