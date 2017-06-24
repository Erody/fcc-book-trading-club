const mongoose = require('mongoose');
const Book = mongoose.model('Book');
import {books} from '../../sampleBooks';

export async function getBooks(req, res) {
	//const books = await Book.find();
	res.json({books: books})
}