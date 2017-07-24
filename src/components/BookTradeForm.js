import React from 'react';
import TextFieldGroup from './TextFieldGroup';
import classnames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import BookList from './BookList';

class BookTradeForm extends React.Component {

	state = {
		tradePartner: this.props.tradePartner || '',
		addBookField: '',
		errors: {},
		loading: false,
		selected: [],
		accepted: false,
	};

	componentWillReceiveProps = (newProps) => {
		if(newProps.trade.selectedBooks !== this.props.trade.selectedBooks) {
			this.props.socket.emit('tradeUpdate', {books: newProps.trade.selectedBooks})
		}
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

		this.props.addBook(this.state.addBookField)
	};

	handleDropdownChange = (e, data) => {
		this.props.fetchSomeBooks(data.value);
		this.setState({selected: data.value});
	};

	render() {

		const dropdownOptions = this.props.books ? this.props.books.map(book => {
			return {
				key: book._id,
				value: book._id,
				text: book.title
			}
		}) : [];

		const dropDown = (
			<Dropdown
				placeholder='Book Title'
				fluid
				multiple
				search
				selection
				options={dropdownOptions}
				onChange={this.handleDropdownChange}
			/>
		);

		return (
			<div className="ui items">
				<div className="item">
					<div className="content">
						<div className="header">
							<h1>Book Trade</h1>
							<div className="meta">
								<h3>You are trading with {this.state.tradePartner}</h3>
							</div>
						</div>
						<div className="middle aligned content">
							{dropDown}
							<BookList books={this.props.trade.selectedBooks} noOptions/>
						</div>
						<div className="extra">
							<div className="ui right floated">
								<button className={classnames('ui', 'labeled', 'icon', 'button', {positive: this.state.accepted})}>
									{this.state.accepted ? 'Accepted' : 'Accept'}
									<i className="checkmark icon"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BookTradeForm;
