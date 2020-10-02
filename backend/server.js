const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound404, errorHandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoute');

dotenv.config();
connectDB();
const app = express();

app.use('/api/products', productRoutes);

app.use(notFound404);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(`server running on port ${PORT} in ${process.env.NODE_ENV}`)
);
