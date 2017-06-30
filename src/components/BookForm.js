import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from './TextFieldGroup';


class BookForm extends React.Component {
	state = {
		_id: this.props.book ? this.props.book._id : null,
		title: this.props.book ? this.props.book.title : '',
		author: this.props.book ? this.props.book.author : '',
		description: this.props.book ? this.props.book.description : '',
		cover: this.props.book ? this.props.book.cover : '',
		errors: {},
		loading: false,
	};

	componentWillReceiveProps = (nextProps) => {
		const { title, author, description, cover } = nextProps.book;
		this.setState({
			title,
			author,
			description,
			cover
		})
	};



	handleChange = (e) => {
		const errors = {...this.state.errors};
		delete errors[e.target.name];

		this.setState({
			[e.target.name]: e.target.value,
			errors
		})
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		const errors = {};
		if (this.state.title === '') errors.title = "Please supply a title.";
		if (this.state.author === '') errors.author = "Please supply an author.";
		if (this.state.description === '') errors.description = "Please supply a short summary.";
		if (this.state.cover === '') errors.cover = "Please supply a cover URL.";

		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		this.setState({errors});
		if(isValid) {
			const { _id, title, author, description, cover } = this.state;
			this.setState({ loading: true });
			this.props.saveBook({ _id, title, author, description, cover})
				.then(() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'You successfully added a new book to your collection.'
					})
				})
				.catch(err => {
					this.setState({loading:false});
					this.props.addFlashMessage({
						type: 'error',
						text: err.response.data.error
					})
				})
		}
	};

	render() {
		const form = (
			<form className={classnames('ui','form', {loading: this.state.loading})} onSubmit={this.handleSubmit}>
				<h1>Add new Book</h1>

				{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>	}

				<TextFieldGroup
					name="title"
					label="Title"
					value={this.state.title}
					onChange={this.handleChange}
					id="title"
					error={this.state.errors.title}
				/>

				<TextFieldGroup
					name="author"
					label="Author"
					value={this.state.author}
					onChange={this.handleChange}
					id="author"
					error={this.state.errors.author}
				/>

				<TextFieldGroup
					name="description"
					label="Short summary"
					value={this.state.description}
					onChange={this.handleChange}
					id="description"
					error={this.state.errors.description}
				/>

				<TextFieldGroup
					name="cover"
					label="Cover"
					value={this.state.cover}
					onChange={this.handleChange}
					id="cover"
					error={this.state.errors.cover}
				/>

				<div className="field">
					{this.state.cover && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
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

BookForm.propTypes = {
	addFlashMessage: React.PropTypes.func.isRequired
};

export default BookForm;