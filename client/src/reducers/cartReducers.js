import { ADD_ITEM_CART, REMOVE_ITEM_CART } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case ADD_ITEM_CART:
			const item = action.payload;
			// finds if the product exist in cart
			const existItem = state.cartItems.find((p) => p.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((p) =>
						p.product === existItem.product ? item : p
					),
				};
			} else {
				// if item doesnt exist in cart
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case REMOVE_ITEM_CART:
			return {};

		default:
			return state;
	}
};
