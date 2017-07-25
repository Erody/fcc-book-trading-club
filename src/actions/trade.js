import { SET_SELECTED_BOOKS, SET_TRADE_ID } from './typeExports';
import axios from 'axios';


export function setSelectedBooks(selectedBooks) {
	return {
		type: SET_SELECTED_BOOKS,
		selectedBooks
	}
}

export function setTradeId(id) {
	return {
		type: SET_TRADE_ID,
		id
	}
}


export function fetchSomeBooks(ids) {
	return dispatch => {
		return axios.post('/api/books/some', ids)
			.then(({data}) => dispatch(setSelectedBooks(data.books)))
	}
}

export function tradeInit(username) {
	return dispatch => {
		return axios.get(`/api/trade/request/${username}`)
			.then(({data}) => dispatch(setTradeId(data.uniqueId)))
	}
}

export function addBook(name) {}

