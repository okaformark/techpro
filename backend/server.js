const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound404, errorHandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoute');
const usersRoute = require('./routes/usersRoute');
const ordersRoute = require('./routes/orderRoute');

// config. .env
dotenv.config();

//config. DB
connectDB();

//initilize express
const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to this url
app.use('/api/products', productRoutes);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);

//error middleware
app.use(notFound404);
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

//server
app.listen(
	PORT,
	console.log(`server running on port ${PORT} in ${process.env.NODE_ENV}`)
);
