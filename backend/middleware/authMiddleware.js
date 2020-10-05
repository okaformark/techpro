const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		console.log('token found');
		try {
			token = req.headers.authorization.split(' ')[1];

			// returns a decoded object of the verified user contained users ID
			const decodedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);

			req.user = await User.findById(decodedJWT.id).select('-password');
			next();
		} catch (error) {
			console.log(error);
			res.sendStatus(401);
			throw new Error('Not authorized. Token failure');
		}
	}
	if (!token) {
		res.sendStatus(401);
		throw new Error('token not found');
	}
});

module.exports = protect;
