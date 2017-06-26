import React from 'react';
import {Link} from 'react-router-dom';

const BookCard = ({book, deleteBook}) => {
	return (
		<div className="ui card">
			<div className="image">
				<img src={book.cover} alt="Book cover"/>
			</div>
			<div className="content">
				<div className="header">{book.title}</div>
				<div className="meta">{book.author}</div>
			</div>
			<div className="extra content">
				<div className="ui two buttons">
					<Link to={`/book/${book._id}`} className="ui basic button green">Edit</Link>
					<div className="ui basic button red" onClick={() => deleteBook(book._id)}>Delete</div>
				</div>
			</div>
		</div>
	)
};

BookCard.propTypes = {
	book: React.PropTypes.object.isRequired,
	deleteBook: React.PropTypes.func.isRequired
};

export default BookCard;