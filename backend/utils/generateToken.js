const jwt = require('jsonwebtoken');

const generateToken = (id) => {
	// takes in the user  id as payload and a secret key and expiration date
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '60d' });
};

module.exports = generateToken;
