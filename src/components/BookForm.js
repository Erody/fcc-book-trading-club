import React from 'react';
import classnames from 'classnames';

class BookForm extends React.Component {
	state = {
		title: '',
		author: '',
		description: '',
		cover: '',
		errors: {}
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
	};

	render() {
		return (
			<form className="ui form" onSubmit={this.handleSubmit}>
				<h1>Add new Book</h1>

				<div className={classnames('field', {error: !!this.state.errors.title})} >
					<label htmlFor="title">Title</label>
					<input
						name="title"
						value={this.state.title}
						onChange={this.handleChange}
						type="text"
						id="title"
					/>
					<span>{this.state.errors.title}</span>
				</div>

				<div className={classnames('field', {error: !!this.state.errors.author})}>
					<label htmlFor="author">Author</label>
					<input
						name="author"
						value={this.state.author}
						onChange={this.handleChange}
						type="text"
						id="author"
					/>
					<span>{this.state.errors.author}</span>
				</div>

				<div className={classnames('field', {error: !!this.state.errors.description})}>
					<label htmlFor="description">Short summary</label>
					<input
						name="description"
						value={this.state.description}
						onChange={this.handleChange}
						type="text"
						id="description"
					/>
					<span>{this.state.errors.description}</span>
				</div>

				<div className={classnames('field', {error: !!this.state.errors.cover})}>
					<label htmlFor="cover">Cover URL</label>
					<input
						name="cover"
						value={this.state.cover}
						onChange={this.handleChange}
						type="text"
						id="cover"
					/>
					<span>{this.state.errors.cover}</span>
				</div>

				<div className="field">
					{this.state.cover && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
				</div>

				<div className="field">
					<button className="ui primary button">Save</button>
				</div>
			</form>
		)
	}
}

export default BookForm;