import mongoose from 'mongoose';
import uuid from 'uuid/v4'
const User = mongoose.model('User');

export async function tradeInit(req, res) {
	const user = await User.findOne({name: req.params.username.toLowerCase().trim()});
	if(user) {
		const uniqueId = uuid();
		res.json({uniqueId})
	} else {
		res.status(400).json({error: "We couldn't find a user with that username."})
	}
}