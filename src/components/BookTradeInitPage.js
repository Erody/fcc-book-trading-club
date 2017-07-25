import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from './TextFieldGroup';
import { connect } from 'react-redux';
import { tradeInit } from '../actions/trade';

class BookTradeInitPage extends React.Component {

	state = {
		loading: false,
		errors: {},
		username: '',
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.tradeInit(this.state.username)
	};

	handleChange = (e) => {
		const errors = {...this.state.errors};
		delete errors[e.target.name];

		this.setState({
			[e.target.name]: e.target.value,
			errors
		})
	};

	render() {
		return (
			<div>

				<h1>Initiate Trade</h1>

				<form className={classnames('ui','form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>

					{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>	}

					<TextFieldGroup
						name="username"
						label="User you wish to trade with"
						value={this.state.username}
						onChange={this.handleChange}
						id="username"
						error={this.state.errors.username}
					/>

					<div className="field">
						<button className="ui primary button">Submit Trade Request</button>
					</div>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		tradeId: state.trade.id,
	}
}

export default connect(mapStateToProps, {tradeInit})(BookTradeInitPage);