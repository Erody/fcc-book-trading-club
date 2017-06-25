export const SET_BOOKS = 'SET_BOOKS';

function handleResponse(res) {
	if (res.ok) {
		return res.json();
	} else {
		const error = new Error(res.statusText);
		error.response = res;
		throw error;
	}
}

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

export function saveBook(data) {
	return dispatch => {
		return fetch('/api/books/add', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => handleResponse(res))
	}
}