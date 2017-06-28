import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		required: 'You must supply a username.',
		unique: 'A user with that username already exists.',
		trim: true
	},
	email: {
		type: String,
		required: 'You must supply an email address.',
		unique: 'That email address is already being used.',
		trim: true
	},
	passwordDigest: {
		type: String,
		required: 'You must supply a password hash.'
	},
	books: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Book'
	}
});


export const User = mongoose.model('User', userSchema);