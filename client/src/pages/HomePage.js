import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import { listProduct } from '../actions/productActions';
import Message from '../component/Message';
import Loader from '../component/Loader';

const HomePage = ({ match }) => {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProduct(keyword));
	}, [dispatch, keyword]);
	return (
		<>
			<h1>LATEST GADGETS</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomePage;
