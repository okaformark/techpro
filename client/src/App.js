import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<>
			<Header />
			<main className='py-3'>
				<Container>
					<h1>WELCOME TO TECH PRO</h1>
					<HomePage />
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
