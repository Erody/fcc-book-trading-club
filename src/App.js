import React, {Component} from 'react';
import { Route} from 'react-router-dom';
import BooksPage from './components/BooksPage';
import BookFormPage from './components/BookFormPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import BookTradePage from './components/BookTradePage';
import ProfilePage from './components/ProfilePage';
import ProfileEditPage from './components/ProfileEditPage';
import FlashMessageList from './components/FlashMessageList';
import Navbar from './components/Navbar';
import requireAuth from './utils/requireAuth';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="ui container">

				<Navbar/>

				<FlashMessageList/>

				<Route path="/books" exact component={BooksPage}/>
				<Route path="/books/add" exact component={requireAuth(BookFormPage)}/>
				<Route path="/book/:_id" component={requireAuth(BookFormPage)}/>
				<Route path="/signup" component={SignupPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/trade" component={BookTradePage}/>
				<Route path="/user/:username" exact component={ProfilePage}/>
				<Route path="/user/:username/edit" exact component={requireAuth(ProfileEditPage)}/>
			</div>
		);
	}
}

export default App;
