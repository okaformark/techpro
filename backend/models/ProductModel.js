const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		rating: { type: Number, required: true },
		comments: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
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
