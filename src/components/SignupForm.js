import React from 'react';
import classnames from 'classnames';

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
				.catch(err => {
					err.response.json()
						.then(({errors}) => this.setState({errors, loading: false}))
				})
		}
	};


	render() {
		return (
			<div>
				<form className={classnames('ui','form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>

					{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>	}

					<div className={classnames('field', {error: !!this.state.errors.username})}>
						<label htmlFor="username" title="This will be your display name on this site.">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<span>{this.state.errors.username}</span>
					</div>

					<div className={classnames('field', {error: !!this.state.errors.email})}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<span>{this.state.errors.email}</span>
					</div>

					<div className={classnames('field', {error: !!this.state.errors.password})}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<span>{this.state.errors.password}</span>
					</div>

					<div className={classnames('field', {error: !!this.state.errors.passwordVerification})}>
						<label htmlFor="passwordVerification">Password Verification</label>
						<input
							type="password"
							id="passwordVerification"
							name="passwordVerification"
							value={this.state.passwordVerification}
							onChange={this.handleChange}
						/>
						<span>{this.state.errors.passwordVerification}</span>
					</div>

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
};

export default SignupForm;