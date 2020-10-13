import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listAllOrdersUser } from '../actions/orderActions';

const ProfilePage = ({ location, history }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderLoggedInUser = useSelector((state) => state.orderLoggedInUser);
	const {
		loading: loadingOrders,
		error: errorOrders,
		orders,
	} = orderLoggedInUser;

	console.log(orders, '????', loadingOrders);

	useEffect(() => {
		//if user is not logged in
		if (!userInfo) {
			history.push('login');
		} else {
			if (!(user.firstName || user.lastName)) {
				dispatch(getUserDetails('profile'));
				console.log('fired off');
				dispatch(listAllOrdersUser());
			} else {
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('password must match');
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					firstName,
					lastName,
					email,
					password,
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='fname'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter first name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='lname'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter last name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant='light'>Details</Button>
										</LinkContainer>
									</td>
									<td>{order._id}</td>
									<td>{order._id}</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfilePage;
