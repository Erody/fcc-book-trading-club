import { SIGNUP_SUCCESS } from '../actions/auth';

export default function user(state = [], action = {}) {
	switch(action.type) {
		case SIGNUP_SUCCESS:
			return action.user;
		default: return state;
	}
}