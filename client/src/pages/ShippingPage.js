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
}));

const ShippingPage = ({ history }) => {
	const [address, setAddress] = useState('');
	const [aptOrunit, setAptOrUnit] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [country, setCountry] = useState('');

	const submitHandler = () => {};

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
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};

export default ShippingPage;
