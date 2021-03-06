import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productCreateReducer,
	productDeleteReducer,
	productListReducer,
	singleProductReducer,
	productEditReducer,
	productReviewCreateReducer,
	productTopRatedReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userEditReducer,
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderLoggedInUserReducer,
	orderGetReducer,
	orderDeliverReducer,
} from './reducers/orderReducers';

// on redux dev tools as state
//combineReducers helper function turns an object whose values are different reducing functions into a single reducing function..
//you can pass to createStore.
// puts all the return values(action types and payloads) of all your reducers in to one big object
const reducer = combineReducers({
	productList: productListReducer,
	singleProduct: singleProductReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productEdit: productEditReducer,
	productReviewCreate: productReviewCreateReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	adminUserList: userListReducer,
	userDelete: userDeleteReducer,
	userEdit: userEditReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderLoggedInUser: orderLoggedInUserReducer,
	orderGet: orderGetReducer,
	orderDeliver: orderDeliverReducer,
});

const cartItemsFromLocalstorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLocalstorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromLocalstorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

//getState() gets the state from here
const initialState = {
	cart: {
		cartItems: cartItemsFromLocalstorage,
		shippingAddress: shippingAddressFromLocalstorage,
	},
	userLogin: { userInfo: userInfoFromLocalstorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
