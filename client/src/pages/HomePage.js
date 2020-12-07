import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Product from '../component/Product';
import { listProduct } from '../actions/productActions';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Paginate from '../component/Paginate';
import ProductCarousel from '../component/ProductCarousel';
import Meta from '../component/Meta';

const HomePage = ({ match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProduct(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);
	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					RETURN
				</Link>
			)}
			<h1>LATEST GADGETS</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomePage;
