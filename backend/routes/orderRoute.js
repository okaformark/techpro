const express = require('express');
const {
	getOrderById,
	addOrderItems,
	updatePaidStatus,
	getUserOrders,
	getAllOrders,
} = require('../controllers/orderController');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

router
	.route('/')
	.post(protect, addOrderItems)
	.get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updatePaidStatus);

module.exports = router;
