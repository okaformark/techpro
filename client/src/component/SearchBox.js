import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) history.push(`/search/${keyword}`);
		else history.push('/');
		setKeyword('');
	};

	return (
		<div>
			<Form onSubmit={searchSubmitHandler} inline>
				<Form.Control
					type='text'
					name='q'
					onChange={(e) => setKeyword(e.target.value)}
					placeholder='Search...'
					className='mr-sm-2 ml-sm-5'
					value={keyword}
				></Form.Control>
				<Button type='submit' variant='outline-success' className='p-2'>
					Search
				</Button>
			</Form>
		</div>
	);
};

export default SearchBox;
