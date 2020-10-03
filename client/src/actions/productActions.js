import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	SINGLE_PRODUCT_REQUEST,
	SINGLE_PRODUCT_SUCCESS,
	SINGLE_PRODUCT_FAIL,
} from '../constants/productsConstants';
import Axios from 'axios';

// thunk enables us to use async here
export const listProduct = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await Axios.get('/api/products');

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listSingleProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_PRODUCT_REQUEST });

		const { data } = await Axios.get(`/api/products/${id}`);

		dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SINGLE_PRODUCT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
