const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

//@desc     Create new order
//@route    POST/api/orders
//access    private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length == 0) {
		res.status(400);
		throw new Error('No orders found');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createOrder = await order.save();
		console.log(createOrder);
		res.status(201).json(createOrder);
	}
});

//@desc 	get order by id
//@route	GET/api/orders/:id
//access	private

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'firstName lastName email'
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

module.exports = { addOrderItems, getOrderById };
