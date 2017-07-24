import React from 'react';
import {Link} from 'react-router-dom';

const BookCardPlain = ({book}) => {
	return (
		<div className="ui card">
			<div className="image">
				<img src={book.cover} alt="Book cover"/>
			</div>
			<div className="content">
				<div className="header">{book.title}</div>
				<div className="meta">{book.author}</div>
			</div>
		</div>
	)
};

BookCardPlain.propTypes = {
	book: React.PropTypes.object.isRequired,
};

export default BookCardPlain;