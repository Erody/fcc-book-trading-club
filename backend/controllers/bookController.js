const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const User = mongoose.model('User');
import {sampleBooks} from '../../sampleBooks';

export async function getBooks(req, res) {
	// await Book.insertMany(sampleBooks); // load sample data
	// await Book.find({}).then(books => {
	// 	const mappedBooks = books.map(book => book._id);
	// 	User.findOneAndUpdate({name: 'erody'}, {$pushAll: {books: mappedBooks}})
	// });
	const books = await Book.find();
	res.json({books})
}

export async function getBook(req, res) {
	const book = await Book.findOne({_id: req.params.id});
	res.json({book})
}

export async function updateBook(req, res) {
	const { errors, isValid} = validate(req.body);
	if(isValid) {
		const { title, author, cover, description} = req.body;

		const book = await Book.findOneAndUpdate(
			{_id: req.body._id},
			{$set: { title, author, cover, description}},
			{new: true});

		res.json({book})
	} else {
		res.status(400).json({errors});
	}
}

export function deleteBook(req, res) {
	Book.findOneAndRemove({_id: req.params.id})
		.then((book) => {
			User.findOneAndUpdate(
				{_id: book.owner},
				{$pull: {books: {_id: book._id}}}
			)
				.then(() => res.json({}));

		})
		.catch(err => res.status(500).json({errors: {global: 'Oops, something went wrong on our end.'}}));

}

export function saveBook(req, res) {
	const{ errors, isValid } = validate(req.body);
	if(isValid) {
		const { title, author, cover, description} = req.body;
		const owner = req.currentUser._id;
		const newBook = new Book({ title, author, cover, description, owner});

		newBook
			.save()
			.then(data => {
				User
					.findOneAndUpdate({_id: newBook.owner}, {$push: {books: newBook._id}})
					.then(user => {
						console.log(user);
						res.json({book: data})
					})
			})
			.catch(err => res.status(500).json({errors: {global: 'Oops, something went wrong on our end.'}}));
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