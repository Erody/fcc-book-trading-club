export const SET_BOOKS = 'SET_BOOKS';

export function setBooks(books) {
	return {
		type: SET_BOOKS,
		books
	}
}

export function fetchBooks() {
	return dispatch => {
		fetch('/api/books')
			.then(res => res.json())
			.then(data => dispatch(setBooks(data.books)))
			.catch(err => console.error(err))
	}
}