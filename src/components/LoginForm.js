import React from 'react';

class LoginForm extends React.Component {
	render() {
		return (
			<div>
				<form className="ui form">

					<div className="field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
						/>
					</div>

					<div className="field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
						/>
					</div>

					<div className="field">
						<button className="ui primary button">Log In</button>
					</div>
				</form>
			</div>
		)
	}
}

export default LoginForm;