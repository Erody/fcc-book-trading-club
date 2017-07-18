import React from 'react';
import { connect } from 'react-redux';
import ProfileEditForm from './ProfileEditForm';
import { getUser, updateUser } from '../actions/actions';

class ProfileEditPage extends React.Component {

	componentWillMount = () => {
		// Get user data by username
		this.props.getUser(this.props.match.params.username)
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
				<ProfileEditForm updateUser={this.props.updateUser} profileUser={this.props.user}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {getUser, updateUser})(ProfileEditPage);