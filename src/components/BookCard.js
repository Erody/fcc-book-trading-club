import React from 'react';

const BookCard = ({book}) => {
	return (
		<div className="ui card">
			<div className="image">
				<img src={book.cover} alt="Book cover"/>
			</div>
			<div className="content">
				<div className="header">{book.title}</div>
			</div>
		</div>
	)
};

BookCard.propTypes = {
	book: React.PropTypes.object.isRequired
};

export default BookCard;