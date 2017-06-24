import React from 'react';

const BookList = ({books}) => {
	const emptyMessage = (
		<p>
			There are no books.
		</p>
	);

	const bookList = (
		<p>
			List of books:
		</p>
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