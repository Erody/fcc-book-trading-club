import { combineReducers } from 'redux';
import books from './reducers/books';
import trade from './reducers/trade';
import auth from './reducers/auth';
import user from './reducers/user';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
	books,
	auth,
	flashMessages,
	user,
	trade
})