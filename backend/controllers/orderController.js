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

//@desc		update order to paid
//@route	PUT /api/orders/:id/pay
//@access	private
const updatePaidStatus = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = await order.save();
		console.log(updatedOrder, '444');
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Payment failed');
	}
});

//@desc		get loggedin user order
//@route	GET /api/orders/myorders
//@access	private
const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
	console.log(orders, '<<<<<<<<<');
});
module.exports = {
	addOrderItems,
	getOrderById,
	updatePaidStatus,
	getUserOrders,
};
