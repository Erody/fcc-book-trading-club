import React from 'react';
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
import ensureOwnership from './utils/ensureOwnership';

import './App.css';

class App extends React.Component {

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

//todo Add a landing page^^

//todo Further secure some pages (only owner of book/profile is allowed to edit)

//todo secure trade
//todo current bug: if only one user offers books in a trade and it is accepted those books are just removed from the previous owner, but not added to the new one.
//todo add form validation everywhere it isn't already
//todo Currently flash messages clutter the screen during trades (up to 4 messages will be shown per trade), find a solution.
