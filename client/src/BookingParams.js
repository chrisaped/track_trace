import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const BookingParams = () => (
  <Router>
    <div>
      <Route path="/:id" component={Child}/>
    </div>
  </Router>
)

const Child = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
};

export default BookingParams;
