import { USER_LOGIN_REQUEST } from '../constants/userContants';
import Axios from 'axios';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await Axios.post(
			'/api/users/login',
			{ email, password },
			config
		);
	} catch (error) {}
};
