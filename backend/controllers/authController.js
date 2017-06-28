import {validateInput} from '../helpers/validation';
import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const User = mongoose.model('User');

export async function signup (req, res) {
	const { isValid, errors } = validateInput(req.body);

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