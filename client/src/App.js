import React, { Component } from 'react';
import BookingSearch from './BookingSearch';
import BookingParams from './BookingParams';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<BookingSearch />
      	<BookingParams />
      </div>
    );
  }
}

export default App;
