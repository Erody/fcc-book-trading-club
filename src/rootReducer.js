import { combineReducers } from 'redux';
import books from './reducers/books';
import auth from './reducers/auth';
import user from './reducers/user';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
	books,
	auth,
	flashMessages,
	user
})