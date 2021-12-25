import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	CLEAR_ERRORS,
} from '../constants/userConstants';

// Auth reducer
export const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			};
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenicated: false,
			};

		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				isAuthenicated: true,
				user: action.payload,
			};

		case REGISTER_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenicated: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
