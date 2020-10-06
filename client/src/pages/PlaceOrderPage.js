import React from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import CheckoutStep from '../pages/CheckoutStep';

const PlaceOrderPage = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	console.log(cart);
	return (
		<>
			<CheckoutStep step1 step2 step3 step4 />
			<Row>
				<Col>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{shippingAddress.address} {shippingAddress.aptOrUnit},
								{shippingAddress.city} {shippingAddress.state},{' '}
								{shippingAddress.zipCode},{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.Image}
														alt={item.name}
														rounded
														fluid
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.quantity} x ${item.price} = $
													{item.quatity * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderPage;
