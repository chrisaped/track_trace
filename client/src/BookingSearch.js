import React from 'react';
import BookingDetails from './BookingDetails';

class BookingSearch extends React.Component {
	state = {
		searchValue: '',
		searchStatus: '',
		searchResult: '',
	};

	updateSearchValue = (e) => {
		const value = e.target.value;

		this.setState({
			searchValue: value,
		});
	}

	searchBookings = (query) => {
	  return fetch(`bookings/${query}`, {
	    accept: 'application/json',
	  }).then(response => {
	    	this.setState({ searchStatus: response.status });
	    	return response.json();
	    })
	    .then(data => this.setState({ searchResult: data }));
	}

	render() {
		const {
			searchValue,
			searchStatus,
			searchResult,
		} = this.state;

		let bookingResult = null;
		if (searchStatus === 200) {
		  bookingResult = <BookingDetails searchResult={searchResult} />;
		} else if (searchStatus === 404) {
			bookingResult = <p>No bookings found. Please try again.</p>;
		}

		return (
			<div>
				<div id='booking-search'>
					<input
						type='text'
						placeholder='Enter a booking number'
						value={searchValue}
						onChange={this.updateSearchValue}
					/>
					<button 
					  onClick={() => this.searchBookings(searchValue)}
					  disabled={!searchValue}
					>
				    Search
				  </button>
				</div>
				<div>
					{bookingResult}
				</div>
			</div>
		);
	}
}

export default BookingSearch;
