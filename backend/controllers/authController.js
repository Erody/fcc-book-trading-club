import {credentialValidation, validateInput} from '../helpers/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const mongoose = require('mongoose');
const User = mongoose.model('User');



export async function signup (req, res) {
	const {errors, isValid} = await validateInput(req.body, credentialValidation);

	if (isValid) {
		const {username, email, password } = req.body;
		const user = new User({
			name: username.toLowerCase(),
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
	const { identifier, password } = req.body;

	const user = await User.findOne({ $or: [
			{email: identifier.toLowerCase()},
			{name: identifier.toLowerCase()}
		]});
	if(user) {
		if(bcrypt.compareSync(password, user.passwordDigest)) {
			const token = jwt.sign({
				id: user._id,
				username: user.name
			}, process.env.JWT_SECRET);
			res.json({token});
		} else {
			res.status(401).json({errors: {global: 'Invalid credentials. Please try again.'}})
		}
	} else {
		res.status(401).json({errors: {global: 'Invalid credentials. Please try again.'}})
	}
}