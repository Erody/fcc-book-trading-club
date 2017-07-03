import React from 'react';
import io from 'socket.io-client';

const socket = io();

class BookTradeForm extends React.Component {
	render() {
		return (
			<div>
				<p>Form is gonna be here</p>
			</div>
		)
	}
}

export default BookTradeForm;