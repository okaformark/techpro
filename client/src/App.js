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
					<HomePage />
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
