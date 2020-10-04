const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

// @desc    fetch all products
// @route    GET /api/products
// @access    public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc    fetch all products
// @route    GET /api/products/:id
// @access    public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		return res.json(product);
	} else {
		res.status(404).json({ message: 'product not found' });
	}
});

module.exports = { getProducts, getProductById };
