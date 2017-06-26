import { SET_BOOKS, ADD_BOOK, BOOK_FETCHED, BOOK_UPDATED, BOOK_DELETED  } from '../actions/actions';

export default function books(state = [], action = {}) {
	switch(action.type) {
		case BOOK_DELETED:
			return state.filter(item => {
				return item._id !== action.id
			});
		case BOOK_UPDATED:
			return state.map(item => {
				if (item._id === action.book._id) return action.book;
				return item;
			});
		case BOOK_FETCHED:
			const index = state.findIndex(item => item._id === action.book._id);
			if(index > -1 ) {
				return state.map(book => {
					if(book._id === action.book._id) return action.book;
					return book;
				})
			} else {
				return [
					...state,
					action.book
				]
			}
		case SET_BOOKS:
			return action.books;
		case ADD_BOOK:
			return [...state, action.book];
		default: return state;
	}
}