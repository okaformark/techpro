import Axios from 'axios';
import { ADD_ITEM_CART } from '../constants/cartConstants';
import { REMOVE_ITEM_CART } from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await Axios.get(`/api/products/${id}`);

	dispatch({
		type: ADD_ITEM_CART,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInstock: data.countInstock,
			quantity,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_ITEM_CART,
		payload: id,
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
