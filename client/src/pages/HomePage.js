import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products';
import Product from '../component/Product';

const HomePage = () => {
	return (
		<>
			<h1>LATEST GADGETS</h1>
			<Row>
				{products.map((product) => (
					<Col sm={12} md={6} lg={4}>
						<Product products={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomePage;
