import React from 'react';

class BookingSearch extends React.Component {
	state = {
		searchValue: '',
		searchResult: '',
		status: '',
	};

	// rename this
	checkStatus = (response) => {
	  this.setState({
			status: response.status,
		});

		return response;
	}

	parseJSON = (response) => {
	  return response.json();
	}	

	search = (query) => {
	  return fetch(`bookings/${query}`, {
	    accept: 'application/json',
	  }).then(this.checkStatus)
	    .then(this.parseJSON)
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
			status,
		} = this.state;

		console.log('FUCKER', searchResult);
		console.log("STATUS", status);

		let searchResultDOM = null;

		if (status === 200) {
		  searchResultDOM = <p>{searchResult.booking_number}</p>;
		} else if (status === 404) {
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