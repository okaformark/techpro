import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ products }) => {
	return (
		<Card className='p-3 my-3 rounded'>
			<a href={`/product/${products._id}`}></a>
			<Card.Img src={products.image} variant='top' />
		</Card>
	);
};

export default Product;
