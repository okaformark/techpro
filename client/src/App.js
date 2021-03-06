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
import MyOrderPage from './pages/MyOrderPage';
import AdminUsersList from './pages/AdminUsersList';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditScreen';
import OrderListPage from './pages/OrderListPage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/admin/userList' component={AdminUsersList} />
					<Route path='/admin/orderList' component={OrderListPage} />
					<Route path='/admin/productList' component={ProductListPage} exact />
					<Route
						path='/admin/productList/:pageNumber'
						component={ProductListPage}
						exact
					/>
					<Route path='/admin/user/:id/edit' component={UserEditPage} />
					<Route path='/admin/product/:id/edit' component={ProductEditPage} />
					<Route path='/order/:id' component={MyOrderPage} />
					<Route path='/shipping' component={ShippingPage} />
					<Route path='/payment' component={PaymentMethodPage} />
					<Route path='/placeorder' component={PlaceOrderPage} />
					<Route path='/register' component={RegisterPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/profile' component={ProfilePage} />
					<Route path='/product/:id' component={ProductDetailsPage} />
					<Route path='/cart/:id?' component={CartPage} />
					<Route path='/search/:keyword' component={HomePage} exact />
					<Route path='/page/:pageNumber' component={HomePage} />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomePage}
					/>
					<Route path='/' component={HomePage} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
