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
		tradePartner: '',
		tradePartnerBooks: [],
		tradePartnerAccepted: false,
		accepted: false,
		tradeId: '',
	};


	componentDidMount = () => {
		this.props.socket.on('tradeUpdate', ({books}) => {
			this.setState({tradePartnerBooks: books});
		});
		this.props.socket.on('trade status', ({accepted}) => {
			this.setState({tradePartnerAccepted: accepted})
		});
		this.props.socket.on('trade data', ({tradePartner, tradeId}) => {
			this.setState({tradePartner, tradeId})
		})
	};

	componentWillMount = () => {
		this.props.getUser(this.props.user.username);
		console.log(`trade ${this.props.user.username}`, this.props.trade.uniqueId);
		this.props.socket.emit('trade', {trade: this.props.trade.uniqueId});
	};

	componentWillUnmount = () => {
		this.props.socket.emit('leave trade', {trade: this.props.trade.uniqueId});
		this.props.socket.disconnect();
	};

	handleAccept = e => {
		this.props.socket.emit('trade status', { id: this.props.trade.uniqueId,accepted: !this.state.accepted});
		this.setState({accepted: !this.state.accepted})
	};

	render() {

		const hasAccepted = (
			<div className="meta">
				<h3 className="ui positive message">Your trading partner has accepted the trade!</h3>
			</div>
		);

		const tradePartner = this.props.trade.tradePartner ? (this.props.trade.tradePartner.name || this.props.trade.tradePartner.username) : '';

		return (
			<div>
				<BookTradeForm
					socket={this.props.socket}
					addBook={this.props.addBook}
					books={this.props.books}
					trade={this.props.trade}
					tradePartner={tradePartner}
					fetchSomeBooks={this.props.fetchSomeBooks}
				/>
				<div className="ui items">
					<div className="item">
						<div className="content">
							<div className="header">
								<h2>{tradePartner}'s offer:</h2>
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
