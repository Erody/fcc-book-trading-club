import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function(ComposedComponent) {
	class Authenticate extends React.Component {

		componentWillMount = () => {
			if(!this.props.auth.isAuthenticated) {
				this.props.addFlashMessage({
					type: 'error',
					text: 'Please login before visiting this page.'
				});
				this.context.router.history.push('/login');
			}
		};

		componentWillUpdate = (nextProps) => {
			if(!nextProps.auth.isAuthenticated) {
				this.context.router.history.push('/')
			}
		};

		render() {
			return (
				<ComposedComponent {...this.props}/>
			)
		}
	}

	Authenticate.propTypes = {
		auth: React.PropTypes.object.isRequired,
		addFlashMessage: React.PropTypes.func.isRequired
	};

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	function mapStateToProps(state) {
		return {
			auth: state.auth,
		}
	}

	return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}

