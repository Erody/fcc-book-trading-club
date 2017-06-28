import { handleResponse } from './actionHelpers'

import {SIGNUP_SUCCESS} from './typeExports';

export function signupSuccessful(token) {
	return {
		type: SIGNUP_SUCCESS,
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