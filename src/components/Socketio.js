import React from 'react';
import { connect } from 'react-redux';
import { Message, Button } from 'semantic-ui-react';


class Socketio extends React.Component {

	state = {
		tradeRequest: false,
		tradePartner: '',
	};



	componentDidMount = () => {
		if(this.props.auth.isAuthenticated) {
			this.props.socket.emit('personal channel', {id: this.props.auth.user.id})
		}
		this.props.socket.on('trade request', ({from}) => {
			this.setState({tradeRequest: true, tradePartner: from})
		})
	};

	render() {

		const tradeRequest = (
			<div>
				<Message
					attached
					header={`${this.state.tradePartner} wants to trade with you`}
				/>
				<Button.Group fluid>
					<Button>Cancel</Button>
					<Button.Or />
					<Button positive>Accept</Button>
				</Button.Group>
			</div>
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

export default connect(mapStateToProps)(Socketio);