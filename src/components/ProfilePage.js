import React from 'react';
import { connect } from 'react-redux';
import { getUser, deleteBook } from '../actions/actions';
import { addFlashMessage } from '../actions/flashMessages';
import BookList from './BookList';

class ProfilePage extends React.Component {

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
		const { picture, name, email} = this.props.profileUser;
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
						<img src={picture || 'https://semantic-ui.com/images/wireframe/image.png'} alt="Profile picture"/>
					</div>
					<div className="content">
						<div className="header">
							{name}
						</div>
						<div className="description">
							<p>{email}</p>
						</div>
						{this.props.currentUser && whenOwner}
					</div>
				</div>
				<h2>{name}'s books:</h2>
				<BookList books={this.props.books} deleteBook={this.props.deleteBook}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	if(state.auth.isAuthenticated) {
		return {
			currentUser: state.auth,
			profileUser: state.user,
			books: state.books
		}
	} else {
		console.log(state);
		return {
			profileUser: state.user,
			books: state.books
		}
	}
}

React.propTypes = {
	profileUser: React.PropTypes.object.isRequired,
	currentUser: React.PropTypes.object,
};

export default connect(mapStateToProps, { getUser, addFlashMessage, deleteBook })(ProfilePage);