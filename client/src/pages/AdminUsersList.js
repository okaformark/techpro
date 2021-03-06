import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const AdminUsersList = ({ history }) => {
	const dispatch = useDispatch();

	const adminUserList = useSelector((state) => state.adminUserList);
	const { loading, error, users } = adminUserList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure ? ')) {
			dispatch(deleteUser(id));
		}
	};

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, successDelete, userInfo]);
	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>FIRST NAME</th>
							<th>LAST NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>
									<a href={`mail to:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default AdminUsersList;
