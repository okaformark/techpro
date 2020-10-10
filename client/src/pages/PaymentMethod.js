import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutStep from '../pages/CheckoutStep';
import { Form, Col } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#212121',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(63),
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
}));

const PaymentMethodPage = ({ history }) => {
	//useSelector accesses the state/reducer from the store
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	//useDispatch is a hook to access redux dispatch function
	// to dispatch the user data inputed by the user to pass into the action fucntions
	//which then dispatches the data to the reducers
	//initialize it like this
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(paymentMethod);
		//use the dispatch here
		//pass in the function from the actions file along with the data we are sending
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	const classes = useStyles();
	return (
		<>
			<Container component='main' maxWidth='sm'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={`${classes.avatar} ${classes.root}`}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h6'>
						Tech Pro
					</Typography>
					<form className={classes.form} noValidate onSubmit={submitHandler}>
						<CheckoutStep step1 step2 step3 />
						<Typography variant='h5' gutterBottom>
							Payment Method
						</Typography>
						<Form.Group>
							<Form.Label as='legend'>
								<h6>Select Method</h6>
							</Form.Label>
							<Col>
								<Form.Check
									type='radio'
									label='Paypal or credit card'
									id='paypal'
									name='paymentMethod'
									value='PayPal'
									checked
									onChange={(e) => setPaymentMethod(e.target.value)}
								></Form.Check>
								<Form.Check
									type='radio'
									label='Stripe'
									id='stripe'
									name='paymentMethod'
									value='Stripe'
									onChange={(e) => setPaymentMethod(e.target.value)}
								></Form.Check>
							</Col>
						</Form.Group>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							className={`${classes.button} ${classes.root}`}
						>
							Next
						</Button>
					</form>
				</div>
			</Container>
		</>
	);
};

export default PaymentMethodPage;
