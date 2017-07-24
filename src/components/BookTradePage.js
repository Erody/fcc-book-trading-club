import React from 'react';
import BookTradeForm from './BookTradeForm';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import { addBook} from '../actions/trade';
import { getUser} from '../actions/actions';
import { fetchSomeBooks} from '../actions/trade';

class BookTradePage extends React.Component {

	socket = io();

	componentWillMount = () => {
		this.props.getUser(this.props.user.username);
	};

	componentWillUnmount = () => {
		this.socket.disconnect();
	};

	render() {
		return (
			<div>
				<BookTradeForm
					socket={this.socket}
					addBook={this.props.addBook}
					books={this.props.books}
					trade={this.props.trade}
					fetchSomeBooks={this.props.fetchSomeBooks}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		books: state.user.books,
		trade: state.trade
	}
}

export default connect(mapStateToProps, {addBook, getUser, fetchSomeBooks})(BookTradePage);

// todo Set up trade form (trade partner, books)
// todo Realtime trading:
	// When adding a book:
	// On keyup: Check if user owns book
		// if he does
			// show selection of all matching books to choose from
			// When one of those books is selected: Add that book to the trade proposal
		// keep updating state for both traders through socket io

// todo non-realtime trading:
	// User creates trade proposal. Adds books on both sides of the trade and sends the proposal.
	// Recipient can then either accept or decline trade whenever he sees the message.