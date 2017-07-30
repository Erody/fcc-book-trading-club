import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {SIGNUP_SUCCESS, SET_CURRENT_USER} from './typeExports';

export function signupSuccessful(token) {
	return {
		type: SIGNUP_SUCCESS,
		token
	}
}

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	}
}

export function signup(user) {
	return dispatch => {
		return axios.post('/api/auth/signup', user)
			.then(({data}) => dispatch(signupSuccessful(data)))
	}
}

export function login(credentials) {
	return dispatch => {
		return axios.post('/api/auth/login', credentials)
			.then(({data}) => {
				const { token } = data;
				localStorage.setItem('jwt', token);
				setAuthToken(token);
				dispatch(setCurrentUser(jwtDecode(token)))
			})
	}
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('jwt');
		setAuthToken(false);
		dispatch(setCurrentUser({}));
		return new Promise((resolve, reject) => {
			// This exists so a flash message can be sent upon logout
			resolve();
		})
	}
}

