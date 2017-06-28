import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
const mongoose = require('mongoose');
const User = mongoose.model('User');

export function credentialValidation(data) {
	const { username, email, password, passwordVerification } = data;
	const errors = {};

	if(validator.isEmpty(username)) {
		errors.username = 'Please supply a username.'
	}
	if(validator.isEmpty(email)) {
		errors.email = 'Please supply an email address.'
	}
	if(validator.isEmpty(password)) {
		errors.password = 'Please supply a password.'
	}
	if(validator.isEmpty(passwordVerification)) {
		errors.passwordVerification = 'Please verify your password.'
	}

	if(!validator.isEmail(email)) {
		errors.email = 'Email is invalid.'
	}

	if(!validator.equals(password, passwordVerification)) {
		errors.password = "Passwords don't match.";
		errors.passwordVerification = "Passwords don't match.";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}

export function validateInput(data, otherValidation) {
	const { errors } = otherValidation(data);

	return User
		.findOne({ $or: [
			{email: data.email},
			{name: data.username}
		]})
		.then(user => {
			if(user) {
				if(user.name === data.username) errors.username = 'A user with that username already exists.';
				if(user.email === data.email) errors.email = 'That email address is already being used.';
			}
		})
		.then(() => {
			return {
				errors,
				isValid: isEmpty(errors)
			}
		});
}