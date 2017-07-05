import React from 'react';
import io from 'socket.io-client';


class BookTradeForm extends React.Component {

	socket = io();

	componentWillUnmount = () => {
		this.socket.disconnect();
	};

	render() {
		return (
			<div>
				<p>Form is gonna be here</p>
			</div>
		)
	}
}

export default BookTradeForm;