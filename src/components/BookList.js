import React from 'react';
import BookCard from './BookCard';

const BookList = ({books}) => {
	const emptyMessage = (
		<p>
			There are no books.
		</p>
	);

	const bookList = (
		<div className="ui three cards">
			{ books.map(book => <BookCard book={book} key={book._id}/>)}
		</div>
	);

	return (
		<div>
			{books.length ? bookList : emptyMessage}
		</div>
	)
};

BookList.propTypes = {
	books: React.PropTypes.array.isRequired
};

export default BookList;