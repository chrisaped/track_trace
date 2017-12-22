import React, { Component } from 'react';
import Router from './Router';
import SearchHistory from './SearchHistory';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchHistory />
      	<Router />
      </div>
    );
  }
}

export default App;
