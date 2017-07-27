import { SET_SELECTED_BOOKS, SET_TRADE_ID, SET_TRADE_INFO  } from '../actions/typeExports';

export default function trade(state = [], action = {}) {
	switch(action.type) {
		case SET_SELECTED_BOOKS:
			return {...state, selectedBooks: action.selectedBooks};
		case SET_TRADE_ID:
			return {
				id: action.id
			};
		case SET_TRADE_INFO:
			return action.data;
		default: return state;
	}
}