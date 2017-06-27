import { handleResponse } from './actionHelpers'

export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const BOOK_FETCHED = 'BOOK_FETCHED';
export const BOOK_UPDATED = 'BOOK_UPDATED';
export const BOOK_DELETED = 'BOOK_DELETED';





export function setBooks(books) {
	return {
		type: SET_BOOKS,
		books
	}
}

export function addBook(book) {
	return {
		type: ADD_BOOK,
		book
	}
}

export function bookFetched(book) {
	return {
		type: BOOK_FETCHED,
		book
	}
}

export function bookUpdated(book) {
	return {
		type: BOOK_UPDATED,
		book
	}
}

export function bookDeleted(id) {
	return {
		type: BOOK_DELETED,
		id
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

export function fetchBook(id) {
	return dispatch => {
		fetch(`/api/book/${id}`)
			.then(res => res.json())
			.then(data => dispatch(bookFetched(data.book)))

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
			.then(data => dispatch(addBook(data.book)))
	}
}

export function updateBook(data) {
	return dispatch => {
		return fetch(`/api/book/${data._id}`, {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => handleResponse(res))
			.then(data => dispatch(bookUpdated(data.book)))

	}
}

export function deleteBook(id) {
	return dispatch => {
		return fetch(`/api/book/${id}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => handleResponse(res))
			.then(data => dispatch(bookDeleted(id)))
	}
}

