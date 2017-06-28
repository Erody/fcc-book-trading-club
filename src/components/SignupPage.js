import React from 'react';
import SignupForm from './SignupForm'
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { addFlashMessage } from '../actions/flashMessages';

class SignupPage extends React.Component {

	state = {
		redirect: false,
	};

	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<SignupForm addFlashMessage={this.props.addFlashMessage} signup={this.props.signup}/>
			</div>
		)
	}
}

SignupPage.propTypes = {
	signup: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { signup, addFlashMessage })(SignupPage);