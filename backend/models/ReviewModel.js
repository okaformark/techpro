const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
	{
		name: { type: String, requred: true },
		rating: { type: Number, requred: true },
		comments: { type: String, requred: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
