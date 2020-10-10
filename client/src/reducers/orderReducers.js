import {
	ORDERS_CREATE_REQUEST,
	ORDERS_CREATE_SUCCESS,
	ORDERS_CREATE_FAIL,
	ORDERS_DETAILS_REQUEST,
	ORDERS_DETAILS_SUCCESS,
	ORDERS_DETAILS_FAIL,
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
