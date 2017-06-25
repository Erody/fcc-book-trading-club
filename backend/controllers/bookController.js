const mongoose = require('mongoose');
const Book = mongoose.model('Book');
import {books} from '../../sampleBooks';

export async function getBooks(req, res) {
	//const books = await Book.find();
	res.json({books: books})
}

export function saveBook(req, res) {
	const{ errors, isValid } = validate(req.body);
	if(isValid) {
		const { title, author, cover, description} = req.body;
		const newBook = new Book({ title, author, cover, description});
		newBook.save()
			.then(data => res.json({book: data}))
			.catch(err => res.status(500).json({errors: {global: 'Oops, something went wrong on our end.'}}));
		res.json({success: true});
	} else {
		res.status(400).json({errors})
	}

}

function validate(data) {
	const errors = {};
	if (data.title === '') errors.title = "Please supply a title.";
	if (data.author === '') errors.author = "Please supply an author.";
	if (data.description === '') errors.description = "Please supply a short summary.";
	if (data.cover === '') errors.cover = "Please supply a cover URL.";

	const isValid = Object.keys(errors).length === 0;

	return { errors, isValid };
}