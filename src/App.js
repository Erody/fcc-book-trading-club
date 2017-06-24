import React, { Component } from 'react';
import logo from './logo.svg';
import { Link, Route } from 'react-router-dom';
import BooksPage from './components/BooksPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Link to="books">Books</Link>
        </p>

        <Route path="/books" component={BooksPage}/>
      </div>
    );
  }
}

export default App;
