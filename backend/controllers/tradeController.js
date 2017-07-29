import mongoose from 'mongoose';
import uuid from 'uuid/v4'
const User = mongoose.model('User');
const Book = mongoose.model('Book');

export async function tradeInit(req, res) {
	const user = await User.findOne({name: req.params.username.toLowerCase().trim()}, {passwordDigest: 0});
	if(user) {
		const uniqueId = uuid();
		res.json({uniqueId, tradePartner: user})
	} else {
		res.status(400).json({error: "We couldn't find a user with that username."})
	}
}

export async function resolveTrade(req, res) {
	// tradePartner books to user books and the other way around
	// user.id
	// trade.tradePartner.id
	// trade.selectedBooks (books belong to user.id)
	// tradePartnerBooks (books belong to trade.tradePartner.id)
	const {user, trade, tradePartnerBooks } = req.body;
	const userA = await User.findOne({_id: user.id});
	const userB = await User.findOne({_id: trade.tradePartner.id});
	await Book.updateMany({_id: {$in: trade.selectedBooks} }, {$set: {owner: userB._id}});
	await Book.updateMany({_id: {$in: tradePartnerBooks} }, {$set: {owner: userA._id}});

	// PULL books from previous owners
	await User.update({_id: trade.tradePartner.id}, {$pullAll: {books: tradePartnerBooks}});
	await User.update({_id: user.id},{$pullAll: {books: trade.selectedBooks}});

	// PUSH books to new owners
	await User.update({_id: user.id},{ $pushAll: {books: tradePartnerBooks}});
	await User.update({_id: trade.tradePartner.id}, { $pushAll: {books: trade.selectedBooks}});

	res.status(200);

}