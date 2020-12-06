const express = require('express');
const router = express.Router();
const {
	getProducts,
	getProductById,
	deleteProduct,
	editProduct,
	createProduct,
	createProductReview,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// both methods are the same
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, editProduct);

module.exports = router;
