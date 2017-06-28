import { handleResponse } from './actionHelpers'

import {SIGNUP_SUCCESS, LOGIN_SUCCESS} from './typeExports';

export function signupSuccessful(token) {
	return {
		type: SIGNUP_SUCCESS,
		token
	}
}

export function loginSuccessful(token) {
	return {
		type: LOGIN_SUCCESS,
		token
	}
}

export function signup(user) {
	return dispatch => {
		return fetch('/api/auth/signup', {
			method: 'post',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => handleResponse(res))
			.then(data => dispatch(signupSuccessful(data)))
	}
}

export function login(credentials) {
	return dispatch => {
		return fetch('/api/auth/login', {
			method: 'post',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => handleResponse(res))
			.then(data => dispatch(loginSuccessful(data)))
	}
}