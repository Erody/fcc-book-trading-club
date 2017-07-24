import { SET_SELECTED_BOOKS } from './typeExports';
import axios from 'axios';


export function setSelectedBooks(selectedBooks) {
	return {
		type: SET_SELECTED_BOOKS,
		selectedBooks
	}
}


export function fetchSomeBooks(ids) {
	return dispatch => {
		return axios.post('/api/books/some', ids)
			.then(({data}) => dispatch(setSelectedBooks(data.books)))
	}
}

export function addBook(name) {}

