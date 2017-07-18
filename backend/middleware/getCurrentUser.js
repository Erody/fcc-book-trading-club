import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const User = mongoose.model('User');

export default (req, res, next) => {
	const authHeader = req.headers['authorization'];
	let token;
	const unauthorizedError = {error: 'You are not authorized to perform this action.'};

	if(authHeader) {
		token = authHeader.split(' ')[1];
	}

	if(token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if(!err) {
				User
					.findOne(
						{ _id: decodedToken.id },
						{ passwordDigest: 0}
					)
					.then(user => {
						if(user) {
							req.currentUser = user;
							next();
						} else {
							next();
						}
					})
					.catch(err => {
						res.status(400).json({error: {message: 'Oops, something went wrong on our end.', response: err}})
					});
			} else {
				next();
			}
		})
	} else {
		next();
	}
}