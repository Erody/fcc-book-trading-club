import React from 'react';
import BookTradeForm from './BookTradeForm';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import { addBook} from '../actions/trade';
import { getUser} from '../actions/actions';
import { fetchSomeBooks} from '../actions/trade';
import BookList from './BookList';
import classnames from 'classnames';

class BookTradePage extends React.Component {

	state = {
		tradePartner: 'Herbert',
		tradePartnerBooks: [],
		tradePartnerAccepted: false,
		accepted: false,

	};

	socket = io();

	componentDidMount = () => {
		this.socket.on('tradeUpdate', ({books}) => {
			console.log('trade update');
			console.log(books);
			this.setState({tradePartnerBooks: books});
		});
		this.socket.on('trade status', ({accepted}) => {
			console.log('trade status');
			console.log(accepted);
			this.setState({tradePartnerAccepted: accepted})
		})
	};

	componentWillMount = () => {
		this.props.getUser(this.props.user.username);
		this.socket.emit('trade', {trade: 'notarealid12390'});
		// this.socket.emit('trade', {trade: this.props.trade.id})
	};

	componentWillUnmount = () => {
		this.socket.emit('leave trade', {trade: 'notarealid12390'});
		this.socket.disconnect();
	};

	handleAccept = e => {
		this.socket.emit('trade status', { id: 'notarealid12390',accepted: !this.state.accepted});
		this.setState({accepted: !this.state.accepted})
	};

	render() {

		const hasAccepted = (
			<div className="meta">
				<h3 className="ui positive message">Your trading partner has accepted the trade!</h3>
			</div>
		);

		return (
			<div>
				<BookTradeForm
					socket={this.socket}
					addBook={this.props.addBook}
					books={this.props.books}
					trade={this.props.trade}
					tradePartner={this.state.tradePartner}
					fetchSomeBooks={this.props.fetchSomeBooks}
				/>
				<div className="ui items">
					<div className="item">
						<div className="content">
							<div className="header">
								<h2>{this.state.tradePartner}'s offer:</h2>
								{this.state.tradePartnerAccepted && hasAccepted }
							</div>
							<div className="middle aligned content">
								<BookList books={this.state.tradePartnerBooks} noOptions/>
							</div>
							<div className="extra">
								<div className="ui right floated">
									<button
										className={classnames('ui', 'labeled', 'icon', 'button', {positive: this.state.accepted})}
										onClick={this.handleAccept}
									>
										{this.state.accepted ? 'Accepted' : 'Accept'}
										<i className="checkmark icon"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
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