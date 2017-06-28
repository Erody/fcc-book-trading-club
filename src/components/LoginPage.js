import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { addFlashMessage } from '../actions/flashMessages';

class LoginPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Log In</h1>
				<LoginForm login={this.props.login} addFlashMessage={this.props.addFlashMessage} />
			</div>
		)
	}
}

LoginPage.propTypes = {
	login: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { login, addFlashMessage })(LoginPage);