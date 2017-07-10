const mongoose = require('mongoose');
const User = mongoose.model('User');
const Book = mongoose.model('Book');

export async function getUser(req, res) {
	if(req.currentUser) {
		if(req.currentUser.name === req.params.username.toLowerCase()) {
			res.json({user: req.currentUser});
		} else {
			const user = await User.findOne(
				{name: req.params.username.toLowerCase()},
				{ passwordDigest: 0}
				);
			!!user ? res.json({user}) : res.status(404).json({error: "Couldn't find user."})
		}
	} else {
		const user = await User.findOne(
			{name: req.params.username.toLowerCase()},
			{ passwordDigest: 0}
		);
		!!user ? res.json({user}) : res.status(404).json({error: "Couldn't find user."})
	}
}
