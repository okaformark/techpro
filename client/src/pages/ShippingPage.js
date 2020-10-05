import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { saveShippingAddress } from '../actions/cartActions';

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
}));

const ShippingPage = ({ history }) => {
	//useSelector accesses the state/reducer from the store
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [aptOrunit, setAptOrUnit] = useState(shippingAddress.aptOrunit);
	const [city, setCity] = useState(shippingAddress.city);
	const [state, setState] = useState(shippingAddress.state);
	const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
	const [country, setCountry] = useState(shippingAddress.country);

	//useDispatch is a hook to access redux dispatch function
	// to dispatch the user data inputed by the user to pass into the action fucntions
	//which then dispatches the data to the reducers
	//initialize it like this
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		//use the dispatch here
		//pass in the function from the actions file along with the data we are sending
		dispatch(
			saveShippingAddress({ address, aptOrunit, city, state, zipCode, country })
		);
		history.push('/payment');
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
						<Typography variant='h6' gutterBottom>
							Shipping address
						</Typography>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									id='address1'
									name='address1'
									label='Address line 1'
									fullWidth
									autoComplete='shipping address-line1'
									defaultValue={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='aptOrUnit'
									name='aptOrUnit'
									label='Apt or Unit No'
									fullWidth
									autoComplete='shipping address-line2'
									defaultValue={aptOrunit}
									onChange={(e) => setAptOrUnit(e.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									id='city'
									name='city'
									label='City'
									fullWidth
									autoComplete='shipping address-level2'
									defaultValue={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='state'
									name='state'
									label='State/Province/Region'
									fullWidth
									defaultValue={state}
									onChange={(e) => setState(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id='zip'
									name='zip'
									label='Zip / Postal code'
									fullWidth
									autoComplete='shipping postal-code'
									defaultValue={zipCode}
									onChange={(e) => setZipCode(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id='country'
									name='country'
									label='Country'
									fullWidth
									autoComplete='shipping country'
									defaultValue={country}
									onChange={(e) => setCountry(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											color='secondary'
											name='saveAddress'
											value='yes'
										/>
									}
									label='Use this address for payment details'
								/>
							</Grid>
							<Button
								variant='contained'
								color='primary'
								// onClick={handleNext}
								className={`${classes.button} ${classes.root}`}
							>
								Next
							</Button>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};

export default ShippingPage;
