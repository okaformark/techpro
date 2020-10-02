import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../component/Rating';
import products from '../products';

const ProductDetailsPage = ({ match }) => {
	const product = products.find((product) => product._id == match.params.id);
	return <div>Product page{product.name}</div>;
};

export default ProductDetailsPage;
