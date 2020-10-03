import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
	const { id } = match.params;
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, quantity));
		}
	}, [dispatch, id, quantity]);
	return <div>cart</div>;
};

export default CartPage;
