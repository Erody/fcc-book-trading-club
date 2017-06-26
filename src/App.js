import React, {Component} from 'react';
import logo from './logo.svg';
import {NavLink, Route} from 'react-router-dom';
import BooksPage from './components/BooksPage';
import BookFormPage from './components/BookFormPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="ui container">
				<div className="ui large inverted menu">
					<NavLink className="item" activeClassName="active" to="/" exact>Home</NavLink>
					<NavLink className="item" activeClassName="active" to="/books" exact>Books</NavLink>
					<NavLink className="item" activeClassName="active" to="/books/add" exact>Add Book</NavLink>
					<div className="menu right">
						<NavLink className="item" activeClassName="active" to="/signup" exact>Sign Up</NavLink>
						<NavLink className="item" activeClassName="active" to="/login" exact>Log In</NavLink>
					</div>
				</div>


				<Route path="/books" exact component={BooksPage}/>
				<Route path="/books/add" exact component={BookFormPage}/>
				<Route path="/book/:_id" component={BookFormPage}/>
				<Route path="/signup" component={SignupPage}/>
				<Route path="/login" component={LoginPage}/>
			</div>
		);
	}
}

export default App;
