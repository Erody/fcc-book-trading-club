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


export async function updateUser(req, res) {
	if(req.params.username !== req.body.auth.user.username) {
		res.status(401).json({error: 'Unauthorized'});
	} else {
		const setOptions = {};
		Object.entries(req.body).forEach(property => {
			setOptions[property[0]] = property[1];
		});
		const user = await User.findOneAndUpdate(
			{name: req.params.username.toLowerCase()},
			{$set: setOptions},
			{new: true}
		);
		res.json({user});
	}

}