import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ name, label, value, type, onChange, id, error}) => {
	return (
		<div className={classnames('field', {error: !!error})} >
			<label htmlFor={id}>{label}</label>
			<input
				name={name}
				value={value}
				onChange={onChange}
				type={type}
				id={id}
			/>
			<span>{error}</span>
		</div>
	)
};

TextFieldGroup.propTypes = {
	name: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	error: React.PropTypes.string,
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;