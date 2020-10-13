import {
	ADD_ITEM_CART,
	CART_RESET,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
	REMOVE_ITEM_CART,
} from '../constants/cartConstants';

// here the reducer take in initial state and actions
// the initials state can be an empt object or an empty array
// the actions contain the action type and the payload from the actions file
// and returns a new state based on the action type
// we can include other logic here like checking in the payload is empty, .filter(), .map() etc
// ususlly the reducer takes in receives paramater like id as a payload so it can perform said fucntions described above.
// saves the payload returned from the actions files into state
export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ADD_ITEM_CART:
			//payload from action file which gets all the product from the DB
			const item = action.payload;
			// checks if there is product from the the payload(from DB) that already exists or matches in the cart state
			// and returns it
			const existItem = state.cartItems.find((p) => p.product === item.product);

			// if it exists
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
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item.product !== action.payload
				),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		case CART_RESET:
			return {
				cartItems: [],
			};
		default:
			return state;
	}
};
