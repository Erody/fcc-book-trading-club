import {credentialValidation} from '../helpers/validation';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
const mongoose = require('mongoose');
const User = mongoose.model('User');

function validateInput(data, otherValidation) {
	const { errors } = otherValidation(data);

	return User
		.findOne({ $or: [
			{email: data.email},
			{name: data.username}
		]})
		.then(user => {
			if(user.name === data.username) errors.username = 'A user with that username already exists.';
			if(user.email === data.email) errors.email = 'That email address is already being used.';
		})
		.then(() => {
			return {
				errors,
				isValid: isEmpty(errors)
			}
		});
}

export async function signup (req, res) {
	const {errors, isValid} = await validateInput(req.body, credentialValidation);

	if (isValid) {
		const {username, email, password } = req.body;
		const user = new User({
			name: username,
			email,
			passwordDigest: bcrypt.hashSync(password, 10)
		});
		await user.save();
		res.json({user})
	} else {
		res.status(400).json({errors});
	}
}