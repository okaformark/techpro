const mongoose = require('mongoose');
const ReviewSchema = require('./ReviewSchema');

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
			type: Boolean,
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
