import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions/actions';
import { addFlashMessage } from '../actions/flashMessages';

class ProfilePage extends React.Component {

	state = {
		user: {},
		isThisUser: false,
	};

	componentWillMount = () => {
		// Get user data by username
		this.props.getUser(this.props.match.params.username)
			.then(({user}) => {
				if(this.props.currentUser) {
					if(this.props.currentUser.isAuthenticated) {
						if(user._id === this.props.currentUser.user.id) {
							this.setState({isThisUser: true})
						}
					}
				}
				this.setState({user})
			})
			.catch(err => {
				this.props.addFlashMessage({
					type: 'error',
					text: err.response.data.error,
				})
			});

	};

	render() {
		const whenOwner = (
			<div className="extra">
				<div className="ui right floated primary button">
					Edit
					<i className="right edit icon"></i>
				</div>
			</div>
		);
		return (
			<div className="ui items">
				<div className="item">
					<div className="ui small image">
						<img src={this.state.user.picture || 'https://semantic-ui.com/images/wireframe/image.png'} alt="Profile picture"/>
					</div>
					<div className="content">
						<div className="header">
							{this.state.user.name}
						</div>
						<div className="description">
							<p>{this.state.user.email}</p>
						</div>
						{this.state.isThisUser && whenOwner}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	if(state.auth.isAuthenticated) {
		return {
			currentUser: state.auth,
		}
	} else {
		return {}
	}
}

// todo dispatch getUser(username) action
	// todo set user state with returned user
		//todo display user details on page

export default connect(mapStateToProps, { getUser, addFlashMessage })(ProfilePage);