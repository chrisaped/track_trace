import React from 'react';

class SearchHistory extends React.Component {
	state = {
		searches: null,
		isOpen: false,
	};

  componentWillMount() {
		const url = 'searches';
	  return fetch(url, {
	    accept: 'application/json',
	  }).then(response => {
		    return response.json();
	    })
	    .then(data => this.setState({ searches: data }));
  }

	toggleSearchHistoryMenu = () => {
		const { isOpen } = this.state;

		this.setState({
			isOpen: !isOpen,
		});
	}

	deleteSearchHistory = () => {
		const url = 'searches';
	  return fetch(url, {
	    method: 'delete',
	  }).then(response => {
		    return response.json();
	    })
	    .then(data => this.setState({
	       searches: null,
	       isOpen: false,
	     }));
	}

	render() {
		const {
      searches,
      isOpen,
		} = this.state;

		const noSearches = !searches || searches.length === 0;
		let searchHistoryMenu = null;
		if (!noSearches && isOpen) {
			searchHistoryMenu = (
				<div>
					<button
						onClick={this.deleteSearchHistory}
					>
						Delete Search History
					</button>
				  <ul>
				    { searches.map((search, i) => {
				    	return(
				    	  <li key={i}>{search.booking_number}</li>
				    	);
				    })}
				  </ul>
				</div>
			);
		}

		return (
			<div>
				<div>
					<button 
					  onClick={this.toggleSearchHistoryMenu}
					>
				    Search History
				  </button>
				</div>
				{searchHistoryMenu}
			</div>
		);
  }
}

export default SearchHistory;
