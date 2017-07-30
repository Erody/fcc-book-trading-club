import React from 'react';
import { connect } from 'react-redux';
import ProfileEditForm from './ProfileEditForm';
import { getUser, updateUser } from '../actions/actions';

class ProfileEditPage extends React.Component {

	componentWillMount = () => {
		// Get user data by username
		this.props.getUser(this.props.match.params.username)
			.then(() => {
				// Ensure user is owner of profile
				if(this.props.user._id !== this.props.auth.user.id) {
					this.props.addFlashMessage({
						type: 'error',
						text: 'You are not authorized to perform this action.'
					});
					this.context.router.history.push('/')
				}
			})
			.catch(err => {
				this.props.addFlashMessage({
					type: 'error',
					text: err.response.data.error,
				})
			});
	};

	render() {
		return (
			<div>
				<ProfileEditForm updateUser={this.props.updateUser} profileUser={this.props.user} auth={this.props.auth}/>
			</div>
		)
	}
}

ProfileEditPage.contextTypes = {
	router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
		auth: state.auth
	}
}

export default connect(mapStateToProps, {getUser, updateUser})(ProfileEditPage);