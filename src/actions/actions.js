import { handleResponse } from './actionHelpers'
import axios from 'axios';

import {SET_BOOKS} from './typeExports';
import {ADD_BOOK} from './typeExports';
import {BOOK_FETCHED} from './typeExports';
import {BOOK_UPDATED} from './typeExports';
import {BOOK_DELETED} from './typeExports';


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
		return axios.get('/api/books')
			.then(({data}) => dispatch(setBooks(data.books)))
	}
}

export function fetchBook(id) {
	return dispatch => {
		return axios.get(`/api/book/${id}`)
			.then(({data}) => dispatch(bookFetched(data.book)))
	}
}

export function saveBook(data) {
	return dispatch => {
		return axios.post('/api/books/add', data)
			.then(({data}) => dispatch(addBook(data.book)));
	}
}

export function updateBook(data) {
	return dispatch => {
		return axios.put(`/api/book/${data._id}`, data)
			.then(({data}) => dispatch(bookUpdated(data.book)))
	}
}

export function deleteBook(id) {
	return dispatch => {
		return axios.delete(`/api/book/${id}`, id)
			.then(({data}) => dispatch(bookDeleted(id)))
	}
}

