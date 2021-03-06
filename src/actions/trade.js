import { SET_SELECTED_BOOKS, SET_TRADE_ID, SET_TRADE_INFO } from './typeExports';
import axios from 'axios';
import { userData } from './actions'


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

export function setTradeInformation(data) {
	return {
		type: SET_TRADE_INFO,
		data
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
			.then(({data}) => {
				dispatch(setTradeId(data.uniqueId));
				dispatch(userData(data.tradePartner))
			})
	}
}

export function resolveTrade(data) {
	return dispatch => {
		return axios.post(`/api/trade/resolve`, data)
	}
}

export function addBook(name) {}

