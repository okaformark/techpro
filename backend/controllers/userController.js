const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');

//@desc    authenticate user and get token
//@route    POST    api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('invalid. Not authorized');
	}
});

//@desc     get auth user profile
//@route    GET/api/users/profile
//@access   private (authenticated users)
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
		});
		console.log(user._id, user.email, 'lol');
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

module.exports = { authUser, getUserProfile };
