import React from 'react';
import BookCard from './BookCard';
import BookCardPlain from './BookCardPlain';

const BookList = ({books, deleteBook, noOptions}) => {
	const emptyMessage = (
		<p>
			There are no books.
		</p>
	);

	const simple = books && books.length ? (
		<div className="ui five cards">
			{ books.map(book => <BookCardPlain book={book} key={book._id}/>)}
		</div>
	) : emptyMessage;

	const bookList = books && books.length ? (
		<div className="ui five cards">
			{ books.map(book => <BookCard deleteBook={deleteBook} book={book} key={book._id}/>)}
		</div>
	) : emptyMessage;

	return (
		<div>
			{noOptions? simple : bookList}
		</div>
	);
};

BookList.propTypes = {
	books: React.PropTypes.array.isRequired,
	deleteBook: React.PropTypes.func.isRequired
};

export default BookList;