import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	SINGLE_PRODUCT_REQUEST,
	SINGLE_PRODUCT_SUCCESS,
	SINGLE_PRODUCT_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_FAIL,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REVIEW_FAIL,
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

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		//getState() gets=> userlogin(store)>userReducer>userLoginReducer(userInfo)>userAction(payload)
		// which is the response from user login from DB which returns _id, names,email and token
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await Axios.delete(`/api/products/${id}`, config);

		dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await Axios.post(`/api/products`, {}, config);

		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });

		dispatch({ type: PRODUCT_CREATE_RESET });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await Axios.post(`/api/products/${productId}/reviews`, review, config);

		dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });

		// dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const editProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_EDIT_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await Axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_EDIT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
