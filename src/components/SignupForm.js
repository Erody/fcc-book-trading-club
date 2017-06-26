import React from 'react';

class SignupForm extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordVerification: '',
	};

	render() {
		return (
			<div>
				<form className="ui form">

					<div className="field">
						<label htmlFor="username" title="This will be your display name on this site.">Username</label>
						<input
							type="text"
							id="username"
							name="username"
						/>
					</div>

					<div className="field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
						/>
					</div>

					<div className="field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
						/>
					</div>

					<div className="field">
						<label htmlFor="password_verification">Password Verification</label>
						<input
							type="password"
							id="password_verification"
							name="password_verification"
						/>
					</div>

					<div className="field">
						<button className="ui primary button">Save</button>
					</div>
				</form>
			</div>
		)
	}
}

export default SignupForm;