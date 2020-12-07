const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');
const Orders = require('../models/OrderModel');

// @desc    fetch all products
// @route    GET /api/products
// @access    public
const getProducts = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};
	const products = await Product.find({ ...keyword });
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

//@desc		delete a product --admin
//@route	DELETE/api/products/:id
//@acess	private/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not removed');
	}
});

//@desc		creat a product --admin
//@route	POST/api/products
//@acess	private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'sample brand',
		category: 'sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'sample description',
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

//@desc		edit a product --admin
//@route	PUT/api/products/:id
//@acess	private/admin
const editProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const editedProduct = await product.save();
		res.status(201).json(editedProduct);
	} else {
		res.status(404);
		throw new Error('Not Updated');
	}
});

//@desc		create a review --admin
//@route	POST/api/products/:id/reviews
//@acess	private/
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comments } = req.body;

	const product = await Product.findById(req.params.id);

	const orders = await Orders.find({ user: req.user._id });

	// Array of product ids that the user ordered
	const ordersItems = [].concat.apply(
		[],
		orders.map((order) =>
			order.orderItems.map((item) => item.product.toString())
		)
	);

	if (product) {
		// Check if the id of the product matches any of the users ordered products
		const hasBought = ordersItems.includes(product._id.toString());

		if (!hasBought) {
			res.status(400);
			throw new Error('You can only review products you bought');
		}
	}
	if (product) {
		console.log(product);
		const reviewed = product.review.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (reviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const newReview = {
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			rating,
			comments,
			user: req.user._id,
		};

		product.review.push(newReview);
		product.numReview = product.review.length;
		product.rating =
			product.review.reduce((acc, item) => item.rating + acc, 0) /
			product.review.length;

		await product.save();
		res.status(201).json({ message: 'Product reviewed' });
	} else {
		res.status(404);
		throw new Error('Not Updated');
	}
});

module.exports = {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	createProductReview,
	editProduct,
};
