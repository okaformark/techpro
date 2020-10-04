const express = require('express');
const router = express.Router();
const {
	getProducts,
	getProductById,
} = require('../controllers/productController');

// both methods are the same
router.route('/').get(getProducts);

router.get('/:id', getProductById);

module.exports = router;
