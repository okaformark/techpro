import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = ({ history }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const cartLen = cart.cartItems.length;

	const logoutHandler = () => {
		dispatch(logout());
		history.push('/login');
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Tech Pro</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{userInfo && (
								<LinkContainer to='/cart'>
									<Nav.Link>
										{cartLen > 0 && (
											<span className='fa-layers fa-fw mx-2'>
												<i className='fas fa-shopping-cart fa-lg'></i>
												<span
													className='fa-layers-counter fa-layers-top-left'
													style={{ background: 'tomato', fontSize: '2.5rem' }}
												>
													{cartLen}
												</span>
											</span>
										)}
										Cart
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo ? (
								<NavDropdown title={userInfo.firstName} id='username'>
									<LinkContainer to='profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Log out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user mx-2'></i>Log in
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminMenu'>
									<LinkContainer to='/admin/userList'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productList'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderList'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default withRouter(Header);
