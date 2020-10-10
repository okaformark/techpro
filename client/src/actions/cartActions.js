import Axios from 'axios';
import {
	ADD_ITEM_CART,
	CART_SAVE_SHIPPING_ADDRESS,
	REMOVE_ITEM_CART,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

//The action functions returns or dispatch adn object containing type and payload {type:'', payload: ''}
// here we write functions that interact with the database according to defined actions
// these functons query the database and return the the desired data
// they can also take in a parameter like id or an object and return data based on that parameter
// or take in id and pass it as payload to the reducer so that the reduce can perform actions like .filter() or .map() based on that id
//with the dispatch function, these functions dispatch the action.type and the payload(retrieved data) to the reducer
// we can also save them to local storage as well
// redux-thunk getState() Returns the current state tree of your application ????
// getstate can be useful for deciding whether to fetch new data, or return a cached result, depending on the current state.

export const addToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await Axios.get(`/api/products/${id}`);

	dispatch({
		type: ADD_ITEM_CART,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			quantity,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: REMOVE_ITEM_CART,
		payload: id,
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: formData,
	});
	localStorage.setItem('shippingAddress', JSON.stringify(formData));
};

export const savePaymentMethod = (paymentData) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: paymentData,
	});
	localStorage.setItem('paymentMethod', JSON.stringify(paymentData));
};
