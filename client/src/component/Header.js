import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
	const cart = useSelector((state) => state.cart);
	const cartLen = cart.cartItems.length;
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>React-Bootstrap</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
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
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user mx-2'></i>Log in
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
