import {
	ORDERS_CREATE_REQUEST,
	ORDERS_CREATE_SUCCESS,
	ORDERS_CREATE_FAIL,
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
			return {
				state,
			};
	}
};
