import React from 'react';
import { connect } from 'react-redux';
import BookList from './BookList';

class BooksPage extends React.Component {

	componentDidMount() {
		this.props.fetchBooks();
	}

	render() {
		return (
			<div>
				<h1>LoL</h1>

				<BookList books={this.props.books} />
			</div>
		)
	}
}

BooksPage.propTypes = {
	books: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		books: state.books
	}
}

export default connect(mapStateToProps)(BooksPage);