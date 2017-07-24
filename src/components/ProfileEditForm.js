import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import classnames from 'classnames';

class ProfileEditForm extends React.Component {
	state = {
		name: this.props.profileUser.name ,
		email: this.props.profileUser.email ,
		picture: this.props.profileUser.picture ,
		city: this.props.profileUser.city ,
		state: this.props.profileUser.state ,
		errors: {},
		loading: false
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.profileUser) {
			const { name, email, picture, city, state } = nextProps.profileUser;
			this.setState({
				name,
				email,
				picture,
				city,
				state
			})
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, picture, city, state } = this.state;
		const data = {
			name,
			email,
			picture,
			city,
			state,
			username: this.props.profileUser.name
		};
		this.props.updateUser(data)
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
		const form = (
			<form className={classnames('ui','form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>
				<h1>Edit your profile information</h1>

				{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>	}

				<TextFieldGroup
					name="name"
					label="Username"
					value={this.state.name}
					onChange={this.handleChange}
					id="name"
					error={this.state.errors.name}
				/>

				<TextFieldGroup
					name="email"
					type="email"
					label="Email Address"
					value={this.state.email}
					onChange={this.handleChange}
					id="email"
					error={this.state.errors.email}
				/>

				<TextFieldGroup
					name="picture"
					label="Profile Picture"
					value={this.state.picture}
					onChange={this.handleChange}
					id="picture"
					error={this.state.errors.picture}
				/>

				<TextFieldGroup
					name="city"
					label="City"
					value={this.state.city}
					onChange={this.handleChange}
					id="city"
					error={this.state.errors.city}
				/>

				<TextFieldGroup
					name="state"
					label="State"
					value={this.state.state}
					onChange={this.handleChange}
					id="state"
					error={this.state.errors.state}
				/>


				<div className="field">
					{this.state.picture && <img src={this.state.picture} alt="profile picture" className="ui small bordered image"/>}
				</div>

				<div className="field">
					<button className="ui primary button">Save</button>
				</div>
			</form>
		);
		return (
			<div>
				{form}
			</div>
		)
	}
}

ProfileEditForm.propTypes = {
	profileUser: React.PropTypes.object.isRequired,
	updateUser: React.PropTypes.func.isRequired,
};

export default ProfileEditForm;