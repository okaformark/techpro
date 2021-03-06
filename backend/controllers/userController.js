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
			firstName: user.firstName,
			lastName: user.lastName,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password. Not authorized');
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

//@desc		update user profile
//@route	PUT api/users/profile
//@access	private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin === true ? true : false;
		if (req.body.password) {
			user.password = req.body.password || user.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			email: updatedUser.email,
			firstName: updatedUser.firstName,
			lasttName: updatedUser.lastName,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
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

	//if user exists
	const user = await User.findOne({ email });
	if (user) {
		res.status(400);
		throw new Error('This user already exist');
	}

	//create new user object
	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	// if new user exists create and send status
	if (newUser) {
		res.status(201).json({
			_id: newUser._id,
			email: newUser.email,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			isAdmin: newUser.isAdmin,
			token: generateToken(newUser._id),
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});

//@desc     get all users
//@route    GET/api/users/
//@access   private/admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

//@desc     delete users
//@route    DELETE/api/users/:id
//@access   private/admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json('User is removed');
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc     get users by id
//@route    GET/api/users/:id
//@access   private/admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc		update user
//@route	PUT api/users
//@access	private/admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			email: updatedUser.email,
			firstName: updatedUser.firstName,
			lasttName: updatedUser.lastName,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

module.exports = {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
