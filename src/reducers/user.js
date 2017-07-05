import { USER_DATA } from '../actions/typeExports';

export default function user(state = [], action = {}) {
	switch(action.type) {
		case USER_DATA:
			return action.user;
		default: return state;
	}
}