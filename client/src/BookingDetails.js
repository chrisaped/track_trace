import React from 'react';

class BookingDetails extends React.Component {
	state = {
		showContainerUpdates: true,
	};

	toggleContainerUpdates = () => {
		const { showContainerUpdates } = this.state;

		this.setState({
			showContainerUpdates: !showContainerUpdates,
		});
	}

	saveSearch = () => {
    const { searchValue } = this.props;
	  const url = 'search/?search[booking_number]=' + searchValue;
	  return fetch(url, {
	    method: 'post',
	    body: JSON.stringify(searchValue),
	  }).then(response => { return response.json(); })
	}	

	render() {
		const { showContainerUpdates } = this.state;
		const { 
			searchResult,
			searchValue,
			location,
		} = this.props;

		const linkUrl = "bookings/" + searchValue;

		if (searchResult && searchResult.containers) {
		  return (
		  	<div>
		  		<div>
						<button
						  onClick={this.saveSearch}
						>
					    Save
					  </button>
		  		</div>
			  	<div>
					  <p>Booking Number: {searchResult.booking_number}</p>
					  <p>Steamship Line: {searchResult.steamship_line}</p>
					  <p>Origin: {searchResult.origin}</p>
					  <p>Destination:: {searchResult.destination}</p>
					</div>
					<div>
			      {searchResult.containers.map((container, ci) => {
			      	let containerUpdates = null;
			      	if (container.updates) {
	              containerUpdates = container.updates.map((update, ui) =>
			      			<div key={ui}>
				      		  <div hidden={!showContainerUpdates}>
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
									<button
									  onClick={this.toggleContainerUpdates}
									  hidden={!container.updates}
									>
								    Show/Hide
								  </button>
								  <div>
				            {containerUpdates}
				          </div>
				        </div>
				      );
			      })}
			    </div>
			    <div>
			    	<p hidden={location !== "/"}>Link: <a href={linkUrl}>{linkUrl}</a></p>
			    </div>
			  </div>
		  );
		}
		return null;
	}
}

export default BookingDetails;
