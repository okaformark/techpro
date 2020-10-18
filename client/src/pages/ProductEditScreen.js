import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { getUserDetails } from '../actions/userActions';
import { listSingleProduct } from '../actions/productActions';

const ProductEditPage = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');
	const [countInStock, setCountInStock] = useState(0);

	const dispatch = useDispatch();

	const singleProduct = useSelector((state) => state.singleProduct);
	const { loading, product, error } = singleProduct;

	useEffect(() => {
		if (!product.name || product._id !== productId) {
			dispatch(listSingleProduct(productId));
		} else {
			setName(product.name);
			setBrand(product.brand);
			setPrice(product.price);
			setDescription(product.description);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setImage(product.image);
		}
	}, [dispatch, productId, history, product]);

	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Link to='/admin/productList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{/* {loadingEdit && <Loader />}
				{errorEdit && <Message variant='danger'>{errorEdit}</Message>} */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter product name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image URL'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter product brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count in stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter count in stock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Count in stock</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Product Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter product description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditPage;
