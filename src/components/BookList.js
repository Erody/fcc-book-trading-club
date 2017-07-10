import React from 'react';
import BookCard from './BookCard';

const BookList = ({books, deleteBook}) => {
	const emptyMessage = (
		<p>
			There are no books.
		</p>
	);

	const bookList = books && books.length ? (
		<div className="ui five cards">
			{ books.map(book => <BookCard deleteBook={deleteBook} book={book} key={book._id}/>)}
		</div>
	) : emptyMessage;

	return (
		<div>
			{bookList}
		</div>
	);
};

BookList.propTypes = {
	books: React.PropTypes.array.isRequired,
	deleteBook: React.PropTypes.func.isRequired
};

export default BookList;