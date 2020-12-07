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
import {
	listSingleProduct,
	createProductReview,
} from '../actions/productActions';
import Loader from '../component/Loader';
import Message from '../component/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productsConstants';
import { CART_RESET } from '../constants/cartConstants';
import Meta from '../component/Meta';

const ProductDetailsPage = ({ history, match }) => {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comments, setComments] = useState('');

	const dispatch = useDispatch();

	const singleProduct = useSelector((state) => state.singleProduct);
	const { loading, error, product } = singleProduct;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		loading: loadingProductReview,
		error: errorProductReview,
		success: successProductReview,
	} = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted');
			setComments('');
			setRating(0);
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listSingleProduct(match.params.id));
	}, [dispatch, match.params.id, successProductReview, loadingProductReview]);

	const addToCartHandler = (product) => {
		console.log(product);
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comments,
			})
		);
		history.push(`/`);
		// history.push(`/products/${match.params.id}`);
		dispatch({ type: CART_RESET });
		localStorage.removeItem('cartItem');
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
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6} className='product-page-section'>
							<Image src={product.image} alt={product.name} fluid />
						</Col>

						<Col md={3} className='product-page-section'>
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
						<Col md={3} className='product-page-section'>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col className='product-page-section'>Price:</Col>
											<Col className='product-page-section'>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col className='product-page-section'>Status:</Col>
											<Col className='product-page-section'>
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
												<Col className='product-page-section'>Quantity</Col>
												<Col className='product-page-section'>
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
											onClick={() => addToCartHandler(product)}
										>
											ADD TO CART
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.review.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant='flush'>
								{product.review.map((r) => (
									<ListGroup.Item key={r._id}>
										<strong>
											{r.firstName} {r.lastName}
										</strong>
										<Rating value={r.rating} />
										<p>{r.createdAt.substring(0, 10)}</p>
										<p>{r.comments}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Leave a review</h2>
									{successProductReview && (
										<Message variant='success'>
											Review submitted successfully
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitReviewHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comments'>
												<Form.Label>Comments</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comments}
													onChange={(e) => setComments(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>Sign in</Link>to leave a review{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductDetailsPage;
