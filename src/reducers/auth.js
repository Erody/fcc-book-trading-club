import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actions/typeExports';
import isEmpty from 'lodash/isEmpty'

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default function user(state = initialState, action = {}) {
	switch(action.type) {
		case LOGIN_SUCCESS:
			return {
				isAuthenticated: !isEmpty(action.user),
				user: action.user
			};
		case SIGNUP_SUCCESS:
			return state;
		default: return state;
	}
}