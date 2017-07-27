import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './rootReducer';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from './actions/auth';
import './index.css';


const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);




if(localStorage.jwt) {
	setAuthToken(localStorage.jwt);
	// If user manually changes token the app crashes without this error handler
	try {
		const decoded =jwtDecode(localStorage.jwt);
		store.dispatch(setCurrentUser(decoded))
	} catch(err) {
		console.log(err);
	}
}

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
	,
	document.getElementById('root')
);
registerServiceWorker();
