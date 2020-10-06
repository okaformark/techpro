import React from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
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
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderPage;
