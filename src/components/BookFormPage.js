import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveBook, fetchBook, updateBook } from '../actions/actions';
import BookForm from './BookForm'

class BookFormPage extends React.Component {

	state = {
		redirect: false,
	};

	componentDidMount = () => {
		if(this.props.match.params._id) {
			this.props.fetchBook(this.props.match.params._id)
		}
	};

	saveBook = ({_id, title, author, description, cover}) => {
		if(_id) {
			return this.props.updateBook({_id, title, author, description, cover})
				.then(() => { this.setState({ redirect: true})})
		} else {
			return this.props.saveBook({title, author, description, cover})
				.then(() => { this.setState({ redirect: true})})
		}
	};

	render() {
		return (
			<div>
				{
					this.state.redirect ?
					<Redirect to="/books"/> :
					<BookForm
						book={this.props.book}
						saveBook={this.saveBook}
					/>
				}
			</div>
		)
	}
}


function mapStateToProps(state, props) {
	if(props.match.params._id) {
		return {
			book: state.books.find(item => item._id === props.match.params._id)
		}
	} else {
		return {
			book: null
		}
	}
}

export default connect(mapStateToProps, { saveBook, fetchBook, updateBook })(BookFormPage);