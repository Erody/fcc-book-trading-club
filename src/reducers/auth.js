import { SIGNUP_SUCCESS } from '../actions/typeExports';

export default function user(state = [], action = {}) {
	switch(action.type) {
		case SIGNUP_SUCCESS:
			return state;
		default: return state;
	}
}