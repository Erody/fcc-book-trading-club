import React from 'react';

class FlashMessage extends React.Component {

	onClick = (e) => {
		this.props.deleteFlashMessage(this.props.message.id);
	};

	render() {
		const { id, text, type } = this.props.message;
		const uiClass = type === 'success' ? 'positive' : 'negative';
		return (
			<div className={`ui ${uiClass} message`}>
				<i onClick={this.onClick} className="close icon"></i>
				<div className="header">
					{type.toUpperCase()}
				</div>
				<p>{text}</p>
			</div>
		)
	}
}

React.propTypes = {
	message: React.PropTypes.object.isRequired,
	deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;