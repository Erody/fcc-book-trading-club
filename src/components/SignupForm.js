import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from './TextFieldGroup';

class SignupForm extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordVerification: '',
		errors: {}
	};

	handleChange = (e) => {
		const errors = {...this.state.errors};
		delete errors[e.target.name];

		this.setState({
			[e.target.name]: e.target.value,
			errors
		})
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		const errors = {};
		if (this.state.username === '') errors.username = "Please supply a username.";
		if (this.state.email === '') errors.email = "Please supply an email.";
		if (this.state.password === '') errors.password = "Please supply a password.";
		if (this.state.passwordVerification === '') errors.passwordVerification = "Please verify your password.";

		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;
		if(isValid) {
			const { username, email, password, passwordVerification } = this.state;
			this.setState({ loading: true });
			this.props.signup({ username, email, password, passwordVerification})
				.then(() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Your sign up was successful and you are now signed in.'
					});
					this.context.router.history.push('/');
				})
				.catch(err => {
					this.setState({loading:false});
					this.setState({errors: err.response.data.errors});
				})
		}
	};


	render() {
		return (
			<div>
				<form className={classnames('ui','form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>

					{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>	}

					<TextFieldGroup
						name="username"
						label="Username"
						value={this.state.username}
						onChange={this.handleChange}
						id="username"
						error={this.state.errors.username}
					/>

					<TextFieldGroup
						name="email"
						label="Email Address"
						value={this.state.email}
						onChange={this.handleChange}
						id="email"
						error={this.state.errors.email}
						type="email"
					/>

					<TextFieldGroup
						name="password"
						label="Password"
						value={this.state.password}
						onChange={this.handleChange}
						id="password"
						error={this.state.errors.password}
						type="password"
					/>

					<TextFieldGroup
						name="passwordVerification"
						label="Password Verification"
						value={this.state.passwordVerification}
						onChange={this.handleChange}
						id="passwordVerification"
						error={this.state.errors.passwordVerification}
						type="password"
					/>

					<div className="field">
						<button className="ui primary button">Save</button>
					</div>
				</form>
			</div>
		)
	}
}

SignupForm.propTypes = {
	signup: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SignupForm;