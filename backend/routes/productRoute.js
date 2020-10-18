const express = require('express');
const router = express.Router();
const {
	getProducts,
	getProductById,
	deleteProduct,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// both methods are the same
router.route('/').get(getProducts);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

module.exports = router;
