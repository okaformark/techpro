import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { getUserDetails } from '../actions/userActions';

const UserEditPage = ({ match, history }) => {
	const userId = match.params.id;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading: loadingEdit, user, error: errorEdit } = userDetails;

	useEffect(() => {
		if (!(user.firstName && user.lastName) || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId]);

	const submitHandler = () => {};
	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingEdit && <Loader />}
				{errorEdit && <Message variant='danger'>{errorEdit}</Message>}
				{loadingEdit ? (
					<Loader />
				) : errorEdit ? (
					<Message variant='danger'>{errorEdit}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter first name'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='name'>
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

						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditPage;
