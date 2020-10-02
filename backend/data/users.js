const bcrypt = require('bcryptjs');

const users = [
	{
		firstName: 'mark',
		lastNane: 'okafor',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('1234', 10),
		isAdmin: true,
	},
	{
		firstName: 'jon',
		lastNane: 'snow',
		email: 'jon@yahoo.com',
		password: bcrypt.hashSync('1234', 10),
	},
	{
		firstName: 'toph',
		lastNane: 'beifong',
		email: 'toph@gmail.com',
		password: bcrypt.hashSync('1234', 10),
	},
];

module.exports = users;
