import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		type: String,
		required: 'You must supply an author'
	},
	// owner: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// 	required: 'Book needs to be submitted by user.'
	// },
	cover: String,
	description: {
		type: String,
		required: 'You must supply a description'
	},
	title: {
		type: String,
		required: 'You must supply a title'
	}
});


export const Book = mongoose.model('Book', bookSchema);