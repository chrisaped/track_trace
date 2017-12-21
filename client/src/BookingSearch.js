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
		let url = `bookings/${query}`;
		if (this.props.location.pathname !== "/") {
			url = `${query}`;
		}

	  return fetch(url, {
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

		if (!searchResult && this.props.match && this.props.match.params.id) {
			this.searchBookings(this.props.match.params.id);
		}

		let bookingResult = null;
		if (searchStatus === 200) {
		  bookingResult = <BookingDetails searchResult={searchResult} />;
		} else if (searchStatus === 404) {
			bookingResult = <p>No bookings found. Please try again.</p>;
		}

		return (
			<div>
				<div id='booking-search' hidden={this.props.location.pathname !== "/"}>
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
