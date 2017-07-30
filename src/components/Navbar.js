import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { addFlashMessage } from '../actions/flashMessages';

class Navbar extends React.Component {

	logout = (e) => {
		e.preventDefault();
		this.props.logout()
			.then(() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'You are now logged out.'
				})
			})
	};

	render() {
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
			<div className="ui large inverted menu">

				<NavLink className="item" activeClassName="active" to="/" exact>Home</NavLink>
				<NavLink className="item" activeClassName="active" to="/books" exact>Books</NavLink>
				<NavLink className="item" activeClassName="active" to="/books/add" exact>Add Book</NavLink>
				<NavLink className="item" activeClassName="active" to="/trade" exact>New Trade</NavLink>
				<NavLink className="item" activeClassName="active" to={`/user/${this.props.auth.user.username}`} exact>Profile</NavLink>
				<div className="menu right">
					<a className="item"  href="#" onClick={this.logout}>Log Out</a>
				</div>
			</div>
		);

		const guestLinks = (
			<div className="ui large inverted menu">

				<NavLink className="item" activeClassName="active" to="/" exact>Home</NavLink>
				<NavLink className="item" activeClassName="active" to="/books" exact>Books</NavLink>
				<div className="menu right">
					<NavLink className="item" activeClassName="active" to="/signup" exact>Sign Up</NavLink>
					<NavLink className="item" activeClassName="active" to="/login" exact>Log In</NavLink>
				</div>
			</div>

		);
		return (
			<div>
				{isAuthenticated ?  userLinks : guestLinks}
			</div>

		)
	}
}

Navbar.propTypes = {
	auth: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logout, addFlashMessage })(Navbar);