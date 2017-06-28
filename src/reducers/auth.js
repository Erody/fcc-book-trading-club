import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actions/typeExports';

export default function user(state = [], action = {}) {
	switch(action.type) {
		case LOGIN_SUCCESS:
			return action.token;
		case SIGNUP_SUCCESS:
			return state;
		default: return state;
	}
}