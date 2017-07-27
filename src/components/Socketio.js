import React from 'react';
import { connect } from 'react-redux';
import AlertMessage from './AlertMessage';
import {  setTradeInformation } from '../actions/trade';
import { addFlashMessage } from '../actions/flashMessages';


class Socketio extends React.Component {

	state = {
		tradeRequest: false,
		tradePartner: '',
		tradeId: '',
	};

	cancelOnClick = (e) => {
		this.setState({tradeRequest: false});
		this.props.socket.emit('cancel trade request', {tradePartner: this.state.tradePartner});
	};

	acceptOnClick = (e) => {
		this.setState({tradeRequest: false});
		this.props.socket.emit('accept trade request', {tradePartner: this.state.tradePartner, tradeId: this.state.tradeId});
		this.context.router.history.push(`/trade/${this.state.tradeId}`);
	};

	componentDidMount = () => {
		console.log(this.context.router);
		if(this.props.auth.isAuthenticated) {
			this.props.socket.emit('personal channel', {id: this.props.auth.user.id})
		}
		this.props.socket.on('trade request', ({from, tradeId}) => {
			this.setState({tradeRequest: true, tradePartner: from, tradeId});
			this.props.setTradeInformation({uniqueId: tradeId, tradePartner: from})
		});
		this.props.socket.on('cancelled trade request', () => {
			this.props.addFlashMessage({
				type: 'alert',
				text: 'The trade request has been cancelled.'
			})
		});
		this.props.socket.on('accepted trade request', ({tradeId}) => {
			this.props.addFlashMessage({
				type: 'success',
				text: 'Your trade request has been accepted. You will now be redirected to the trading page.'
			});
			// this.props.setTradeInformation({tradePartner: this.props.user, tradeId: this.props.trade.id})
			this.context.router.history.push(`/trade/${tradeId}`);
		});
	};

	render() {

		const tradeRequest = (
			<AlertMessage
				header="Trade Request"
				content={`${this.state.tradePartner.username} wants to trade with you`}
				cancelOnClick={this.cancelOnClick}
				acceptOnClick={this.acceptOnClick}
			/>
		);

		return (
			<div>
				{this.state.tradeRequest && tradeRequest}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

Socketio.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, { addFlashMessage, setTradeInformation })(Socketio);