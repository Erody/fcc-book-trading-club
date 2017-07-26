import React from 'react';
import { connect } from 'react-redux';
import AlertMessage from './AlertMessage';
import { addFlashMessage } from '../actions/flashMessages';


class Socketio extends React.Component {

	state = {
		tradeRequest: false,
		tradePartner: '',
	};

	cancelOnClick = (e) => {
		this.setState({tradeRequest: false});
		this.props.socket.emit('cancel trade request', {tradePartner: this.state.tradePartner});
	};

	acceptOnClick = (e) => {
		// todo emit update to notify trade partner of accepted trade request
	};

	componentDidMount = () => {
		if(this.props.auth.isAuthenticated) {
			this.props.socket.emit('personal channel', {id: this.props.auth.user.id})
		}
		this.props.socket.on('trade request', ({from}) => {
			this.setState({tradeRequest: true, tradePartner: from})
		});
		this.props.socket.on('cancelled trade request', () => {
			this.props.addFlashMessage({
				type: 'alert',
				text: 'The trade request has been cancelled.'
			})
		})
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

export default connect(mapStateToProps, { addFlashMessage })(Socketio);