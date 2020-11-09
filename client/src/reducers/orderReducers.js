import {
	ORDERS_CREATE_REQUEST,
	ORDERS_CREATE_SUCCESS,
	ORDERS_CREATE_FAIL,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_DETAILS_FAIL,
	ORDERS_PAY_RESET,
	ORDERS_PAY_FAIL,
	ORDERS_PAY_SUCCESS,
	ORDERS_PAY_REQUEST,
	ORDERS_LOGGED_IN_USERS_REQUEST,
	ORDERS_LOGGED_IN_USERS_SUCCESS,
	ORDERS_LOGGED_IN_USERS_FAIL,
	ORDERS_LOGGED_IN_USERS_RESET,
	ORDERS_GET_REQUEST,
	ORDERS_GET_SUCCESS,
	ORDERS_GET_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDERS_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDERS_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};
		case ORDERS_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDERS_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDERS_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case ORDERS_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDERS_PAY_REQUEST:
			return {
				loading: true,
			};
		case ORDERS_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDERS_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case ORDERS_PAY_RESET:
			return {};

		default:
			return state;
	}
};
export const orderLoggedInUserReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDERS_LOGGED_IN_USERS_REQUEST:
			return {
				loading: true,
			};
		case ORDERS_LOGGED_IN_USERS_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case ORDERS_LOGGED_IN_USERS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDERS_LOGGED_IN_USERS_RESET:
			return {
				orders: [],
			};
		default:
			return state;
	}
};

export const orderGetReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDERS_GET_REQUEST:
			return {
				loading: true,
			};
		case ORDERS_GET_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
				success: true,
			};

		case ORDERS_GET_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
