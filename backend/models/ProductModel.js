const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
	{
		name: { type: String, requred: true },
		rating: { type: Number, requred: true },
		comments: { type: String, requred: true },
	},
	{ timestamps: true }
);

const ProductSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		review: [ReviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReview: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', ProductSchema);
