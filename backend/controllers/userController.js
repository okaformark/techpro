const asyncHandler = require('express-async-handler');
const { throwError } = require('rxjs');
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
			firstName: user.firstName,
			lastName: user.lastName,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc     register new user
//@route    POST /api/users
//@acess    public

const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		res.sendStatus(400);
		throw new Error('This user already exist');
	}
	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password,
	});
	if (newUser) {
		res.sendStatus(201).json({
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.sendStatus(400);
		throw new Error('invalid user data');
	}
});

module.exports = { authUser, getUserProfile, registerUser };
