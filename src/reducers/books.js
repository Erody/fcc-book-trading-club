import { SET_BOOKS, ADD_BOOK  } from '../actions/actions';

export default function books(state = [], action = {}) {
	switch(action.type) {
		case SET_BOOKS:
			return action.books;
		case ADD_BOOK:
			return [...state, action.book];
		default: return state;
	}
}