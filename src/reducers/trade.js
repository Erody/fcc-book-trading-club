import { SET_SELECTED_BOOKS, SET_TRADE_ID  } from '../actions/typeExports';

export default function trade(state = [], action = {}) {
	switch(action.type) {
		case SET_SELECTED_BOOKS:
			return {selectedBooks: action.selectedBooks};
		case SET_TRADE_ID:
			return {
				id: action.id
			};
		default: return state;
	}
}