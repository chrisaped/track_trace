import React from 'react';
import Client from './Client';

class BookingSearch extends React.Component {
	state = {
		searchValue: '',
	};

	updateSearchValue = (e) => {
		const value = e.target.value;

		this.setState({
			searchValue: value,
		});
	}

	searchBookings = () => {
		const searchValue = this.state.searchValue;

		if (searchValue === '') {
			console.log('nothing here!');
		} else {
			Client.search(searchValue);
		}
	}

	render() {
		return (
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
		);
	}

}

export default BookingSearch;