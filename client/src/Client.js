function search(query) {
	console.log(query);
  return fetch(`bookings/${query}`, {
    accept: 'application/json',
  }).then(parseJSON);
}

function parseJSON(response) {
	console.log(response);
  return response.json();
}

const Client = { search };
export default Client;
