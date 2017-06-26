import React, {Component} from 'react';
import logo from './logo.svg';
import {NavLink, Route} from 'react-router-dom';
import BooksPage from './components/BooksPage';
import BookForm from './components/BookForm';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="ui container">
				<div className="ui three item menu">
					<NavLink className="item" activeClassName="active" to="/" exact>Home</NavLink>
					<NavLink className="item" activeClassName="active" to="/books" exact>Books</NavLink>
					<NavLink className="item" activeClassName="active" to="/books/add" exact>Add Book</NavLink>
				</div>


				<Route path="/books" exact component={BooksPage}/>
				<Route path="/books/add" exact component={BookForm}/>
				<Route path="/book/:_id" component={BookForm}/>
			</div>
		);
	}
}

export default App;
