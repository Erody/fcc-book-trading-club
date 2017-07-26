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
import BookTradeInitPage from './components/BookTradeInitPage';
import Navbar from './components/Navbar';
import Socketio from './components/Socketio';
import io from 'socket.io-client';
import requireAuth from './utils/requireAuth';

import './App.css';

class App extends Component {

	socket = io();

	render() {
		return (
			<div className="ui container">

				<Navbar/>

				<FlashMessageList/>

				<Socketio socket={this.socket}/>

				<Route path="/books" exact component={BooksPage}/>
				<Route path="/books/add" exact component={requireAuth(BookFormPage)}/>
				<Route path="/book/:_id" component={requireAuth(BookFormPage)}/>
				<Route path="/signup" component={SignupPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/trade" exact component={() => <BookTradeInitPage socket={this.socket}/>}/>
				<Route path="/trade/:roomid" exact component={()=> <BookTradePage socket={this.socket}/>}/>
				<Route path="/user/:username" exact component={ProfilePage}/>
				<Route path="/user/:username/edit" exact component={requireAuth(ProfileEditPage)}/>
			</div>
		);
	}
}



export default App;

//todo Further secure some pages (only owner of book/profile is allowed to edit)

// After trade request is sent:
	// Redirect to home page
	// Show flash message 'Waiting for ${tradeRecipient} to accept the trade' with a loading symbol
	// When trade is declined
		// Update the flash message to say that the trade has been declined
	// When trade is accepted
		// Update the flash message to say that trade has been accepted. Offer link to enter the trade room

	// User that has to accept/decline the trade request
		// If user accepts
			// Redirect user to the trade room
		// If user declines
			// Show flash message 'You declined the trade'
