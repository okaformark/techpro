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
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
} from '../constants/productsConstants';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const singleProductReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case SINGLE_PRODUCT_REQUEST:
			return {
				loading: true,
				...state,
			};
		case SINGLE_PRODUCT_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case SINGLE_PRODUCT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case PRODUCT_DELETE_FAIL:
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

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload,
			};
		case PRODUCT_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_CREATE_RESET:
			return {
				state: {},
			};

		default:
			return {
				state,
			};
	}
};
