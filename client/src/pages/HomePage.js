import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import Axios from 'axios';

const HomePage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await Axios.get('/api/products');
			setProducts(data);
		};
		fetchProducts();
	}, []);
	return (
		<>
			<h1>LATEST GADGETS</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomePage;
