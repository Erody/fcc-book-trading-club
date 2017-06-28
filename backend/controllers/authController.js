import {credentialValidation, validateInput} from '../helpers/validation';
import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const User = mongoose.model('User');



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

export async function login (req, res) {
	res.json(req.body);
}