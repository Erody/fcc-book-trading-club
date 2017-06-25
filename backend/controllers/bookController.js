const mongoose = require('mongoose');
const Book = mongoose.model('Book');
import {books} from '../../sampleBooks';

export async function getBooks(req, res) {
	//const books = await Book.find();
	res.json({books: books})
}

export async function saveBook(req, res) {
	const { title, author, cover, description} = req.body;
	const newBook = new Book({ title, author, cover, description});
	await newBook.save();
}