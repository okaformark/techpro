import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethod';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/orderPage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/order/:id' component={OrderPage} />
					<Route path='/shipping' component={ShippingPage} />
					<Route path='/payment' component={PaymentMethodPage} />
					<Route path='/placeorder' component={PlaceOrderPage} />
					<Route path='/register' component={RegisterPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/profile' component={ProfilePage} />
					<Route path='/product/:id' component={ProductDetailsPage} />
					<Route path='/cart/:id?' component={CartPage} />
					<Route path='/' component={HomePage} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
