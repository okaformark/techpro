const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./config/db');
const { notFound404, errorHandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoute');
const usersRoute = require('./routes/usersRoute');
const ordersRoute = require('./routes/orderRoute');
const uploadRoute = require('./routes/uploadRoutes');

// config. .env
dotenv.config();

//config. DB
connectDB();

//config cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//initilize express
const app = express();

// body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to this url
app.use('/api/products', productRoutes);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/upload', uploadRoute);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);
//make folder static so it can be implemented by browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
