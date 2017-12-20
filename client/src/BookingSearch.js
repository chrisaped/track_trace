import React from 'react';

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

	parseBooking = (result) => {
		if (result && result.containers) {
		  return (
		  	<div>
			  	<div>
					  <p>Booking Number: {result.booking_number}</p>
					  <p>Steamship Line: {result.steamship_line}</p>
					  <p>Origin: {result.origin}</p>
					  <p>Destination:: {result.destination}</p>
					</div>
					<div>
			      {result.containers.map((container, ci) => {
			      	let containerUpdates = null;
			      	if (container.updates) {
                container.updates.map((update, ui) => 
				      		containerUpdates =
				      		  <div>
				      		  	<p>Update: {ui + 1}</p>
				      		    <p>Container Number: {update.container_number}</p>
				      		    <p>Arrival: {update.arrival}</p>
				      		    <p>Delivery On: {update.delivery_on}</p>
				      		    <p>Steamship Line: {update.steamship_line}</p>
				      		    <p>Origin: {update.origin}</p>
				      		    <p>Destination: {update.destination}</p>
				      		    <p>Vessel: {update.vessel}</p>
				      		    <p>Voyage: {update.voyage}</p>
				      		    <p>Vessel ETA: {update.vessel_eta}</p>
				      		  </div>
				      	);
			      	}


			      	return (
				      	<div key={ci}>
				      		<p>Container {ci + 1}</p>
				          <p>Number: {container.number}</p>
				          <p>Size: {container.size}</p>
				          <p>Type: {container.type}</p>
				          <p>Last Status: {container.last_status}</p>
				          <p>Location: {container.location}</p>
				          <p>Last Status At: {container.last_status_at}</p>
				          {containerUpdates}
				        </div>
				      );
			      })}					
			    </div>
			  </div>
		  );
		}
	}

	render() {
		const {
			searchValue,
			searchStatus,
			searchResult,
		} = this.state;

		let bookingResult = null;
		if (searchStatus === 200) {
		  bookingResult = this.parseBooking(searchResult);
		} else if (searchStatus === 404) {
			bookingResult = <p>No bookings found. Please try again.</p>;
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
