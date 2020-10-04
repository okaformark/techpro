const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');

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
			token: null,
		});
	} else {
		res.status(401);
		throw new Error('invalid. Not authorized');
	}
});

module.exports = authUser;
