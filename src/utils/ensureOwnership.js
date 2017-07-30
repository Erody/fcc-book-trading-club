import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function(ComposedComponent) {
	class EnsureOwnership extends React.Component {

		componentWillMount = () => {
			console.log(this.props);
			if(this.props.auth.user.username !== this.props.owner) {
				this.props.addFlashMessage({
					type: 'danger',
					text: 'You are not authorized to perform this action.'
				});
				this.context.router.history.push('/');
			}
		};

		componentWillUpdate = (nextProps) => {
			if(nextProps.auth.user.username !== nextProps.owner) {
				this.props.addFlashMessage({
					type: 'danger',
					text: 'You are not authorized to perform this action.'
				});
				this.context.router.history.push('/');
			}
		};

		render() {
			return (
				<ComposedComponent {...this.props}/>
			)
		}
	}

	EnsureOwnership.propTypes = {
		auth: React.PropTypes.object.isRequired,
		addFlashMessage: React.PropTypes.func.isRequired
	};

	EnsureOwnership.contextTypes = {
		router: React.PropTypes.object.isRequired
	};

	function mapStateToProps(state) {
		return {
			auth: state.auth,
		}
	}

	return connect(mapStateToProps, {addFlashMessage})(EnsureOwnership);
}

