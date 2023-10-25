import axios from 'axios';

//Localhost
//const host = 'http://localhost:8000'

//Serverhost
const host = 'https://reango-48565de87753.herokuapp.com'


// Create an instance of Axios with a base URL
const client = axios.create({
  baseURL: host, // Replace with your API server's URL
});

// Add interceptors or headers if needed
// client.interceptors...

export { client };