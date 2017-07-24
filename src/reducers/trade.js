import { SET_SELECTED_BOOKS  } from '../actions/typeExports';

const initialState = {
	selectedBooks: []
};

export default function trade(state = initialState, action = {}) {
	switch(action.type) {
		case SET_SELECTED_BOOKS:
			return {selectedBooks: action.selectedBooks};
		default: return state;
	}
}