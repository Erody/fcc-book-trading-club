import React from 'react';
import SignupForm from './SignupForm'
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

class SignupPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<SignupForm signup={this.props.signup}/>
			</div>
		)
	}
}

SignupPage.propTypes = {
	signup: React.PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupPage);