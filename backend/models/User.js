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
	city: String,
	state: String,
	passwordDigest: {
		type: String,
		required: 'You must supply a password hash.'
	},
	books: [
		{ type: mongoose.Schema.ObjectId, ref: 'Book'}
	],
	picture: {
		type: String,
	}
});

const autoPopulate = function (next) {
	this.populate('books');
	next();
};

userSchema
	.pre('findOne', autoPopulate)
	.pre('find', autoPopulate)


export const User = mongoose.model('User', userSchema);