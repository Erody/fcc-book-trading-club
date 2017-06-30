import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from './TextFieldGroup';

class LoginForm extends React.Component {

	state = {
		identifier: '',
		password: '',
		errors: {},
		loading: false
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
		if (this.state.identifier === '') errors.identifier = "Please supply either a username or an email address.";
		if (this.state.password === '') errors.password = "Please supply a password.";

		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		this.setState({errors});

		if(isValid) {
			const { identifier, password, errors } = this.state;
			this.setState({ loading: true });
			this.props.login({ identifier, password })
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
		const { identifier, password, errors, loading } = this.state;
		return (
			<div>
				<form className={classnames('ui','form', {loading})} onSubmit={this.handleSubmit}>

					{!!errors.global && <div className="ui negative message"><p>{errors.global}</p></div>	}

					<TextFieldGroup
						name="identifier"
						label="Identifier"
						value={identifier}
						onChange={this.handleChange}
						id="identifier"
						error={errors.identifier}
					/>

					<TextFieldGroup
						name="password"
						label="Password"
						value={password}
						onChange={this.handleChange}
						id="password"
						error={errors.password}
						type="password"
					/>

					<div className="field">
						<button className="ui primary button">Log In</button>
					</div>
				</form>
			</div>
		)
	}
}

LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default LoginForm;