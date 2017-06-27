import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
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

export async function signup (req, res) {
	const { isValid, errors } = validateInput(req.body);

	if (isValid) {

	} else {
		res.status(400).json({errors});
	}
}