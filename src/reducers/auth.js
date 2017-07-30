import { SIGNUP_SUCCESS, SET_CURRENT_USER} from '../actions/typeExports';
import isEmpty from 'lodash/isEmpty'

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default function user(state = initialState, action = {}) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !isEmpty(action.user),
				user: action.user
			};
		case SIGNUP_SUCCESS:
			return state;
		default: return state;
	}
}