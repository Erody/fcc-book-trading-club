import React from 'react';
import BookCard from './BookCard';

const BookList = ({books, deleteBook}) => {
	const emptyMessage = (
		<p>
			There are no books.
		</p>
	);

	const bookList = (
		<div className="ui five cards">
			{ books.map(book => <BookCard deleteBook={deleteBook} book={book} key={book._id}/>)}
		</div>
	);

	return (
		<div>
			{books.length ? bookList : emptyMessage}
		</div>
	)
};

BookList.propTypes = {
	books: React.PropTypes.array.isRequired,
	deleteBook: React.PropTypes.func.isRequired
};

export default BookList;