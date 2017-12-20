import React from 'react';

class BookingSearch extends React.Component {
	state = {
		searchValue: '',
		searchResult: '',
		searchStatus: '',
	};

	updateSearchStatus = (response) => {
	  this.setState({
			searchStatus: response.status,
		});

		return response;
	}

	search = (query) => {
	  return fetch(`bookings/${query}`, {
	    accept: 'application/json',
	  }).then(this.updateSearchStatus)
	    .then(response => response.json())
	    .then(result => this.setState({ searchResult: result }));
	}	

	updateSearchValue = (e) => {
		const value = e.target.value;

		this.setState({
			searchValue: value,
		});
	}

	searchBookings = () => {
		const searchValue = this.state.searchValue;

		if (searchValue) {
			this.search(searchValue);
		} else {
			window.alert("Please enter a value!");
		}
	}


	render() {
		const {
			searchResult,
			searchStatus,
		} = this.state;

		let searchResultDOM = null;

		if (searchStatus === 200) {
		  searchResultDOM = <p>{searchResult.booking_number}</p>;
		} else if (searchStatus === 404) {
			searchResultDOM = <p>ERROR</p>;
		}

		return (
			<div>
				<div id='booking-search'>
					<input
						type='text'
						placeholder='Enter a booking number'
						value={this.state.searchValue}
						onChange={this.updateSearchValue}
					/>
					<button onClick={this.searchBookings}>
				    Search
				  </button>
				</div>
				<div>
					{searchResultDOM}
				</div>
			</div>
		);
	}

}

export default BookingSearch;
