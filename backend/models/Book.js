import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	// author: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// 	required: 'You must supply an author'
	// },
	image: String,
	description: {
		type: String,
		required: 'You must supply a description'
	}
});


export const Book = mongoose.model('Book', bookSchema);