import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={HomePage} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
