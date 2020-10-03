import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../component/Rating';
import { listSingleProduct } from '../actions/productActions';
import Loader from '../component/Loader';
import Message from '../component/Message';

const ProductDetailsPage = ({ history, match }) => {
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listSingleProduct(match.params.id));
	}, [dispatch, match.params.id]);
	const singleProduct = useSelector((state) => state.singleProduct);
	const { loading, error, product } = singleProduct;

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Return
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>

					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReview} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: <p>{product.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0
													? 'Available'
													: 'Out of stock'}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity</Col>
											<Col>
												<Form.Control
													as='select'
													value={quantity}
													onChange={(e) => {
														setQuantity(e.target.value);
													}}
												>
													{[...Array(product.countInStock).keys()].map(
														(count) => (
															<option key={count + 1} value={count + 1}>
																{count + 1}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										ADD TO CART
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductDetailsPage;
