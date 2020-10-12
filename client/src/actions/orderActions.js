import Axios from 'axios';
import {
	ORDERS_CREATE_REQUEST,
	ORDERS_CREATE_SUCCESS,
	ORDERS_CREATE_FAIL,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_FAIL,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_PAY_FAIL,
	ORDERS_PAY_SUCCESS,
	ORDERS_PAY_REQUEST,
	ORDERS_PAY_RESET,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDERS_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await Axios.post(`/api/orders`, order, config);
		console.log(data, 'popop');

		dispatch({
			type: ORDERS_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDERS_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDERS_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await Axios.get(`/api/orders/${id}`, config);
		console.log(data, 'popop');

		dispatch({
			type: ORDERS_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDERS_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDERS_PAY_REQUEST,
		});

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
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		);
		console.log(data, 'popop');

		dispatch({
			type: ORDERS_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDERS_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
