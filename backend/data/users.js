const bcrypt = require('bcryptjs');

const users = [
	{
		firstName: 'mark',
		lastName: 'okafor',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('admin1234', 10),
		isAdmin: true,
	},
	{
		firstName: 'jon',
		lastName: 'snow',
		email: 'jon@yahoo.com',
		password: bcrypt.hashSync('jon1234', 10),
	},
	{
		firstName: 'toph',
		lastName: 'beifong',
		email: 'toph@gmail.com',
		password: bcrypt.hashSync('toph1234', 10),
	},
	{
		firstName: 'oge',
		lastName: 'egbujor',
		email: 'oge@gmail.com',
		password: bcrypt.hashSync('oge1234', 10),
		isAdmin: true,
	},
	{
		firstName: 'kay',
		lastName: 'oke',
		email: 'kay@gmail.com',
		password: bcrypt.hashSync('aky1234', 10),
	},
];

module.exports = users;
