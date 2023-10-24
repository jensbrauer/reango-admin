import { client } from '../api'; // Import the Axios client from your API configuration module

let refresh = false;

client.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log("Interceptor blockage: Handling 401 Unauthorized Error");

      // Log the current refresh token from localStorage
      //console.log('Refresh Token:', localStorage.getItem('refresh_token'));

      try {
        const response = await client.post(
          '/token/refresh/',
          {
            refresh: localStorage.getItem('refresh_token')
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );

        console.log('Refresh Token Response:', response);

        if (response.status === 200) {
          // Log the new access token
          //console.log('New Access Token:', response.data['access']);

          // Update the Authorization header in the Axios client
          //client.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
          error.config.headers.Authorization = `Bearer ${response.data['access']}`;
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          console.log('TRY WITH NEW')
          // Log the updated request configuration
          console.log('Updated Request Config:', error.config);

          // Retry the original request with the updated access token
          return client(error.config);
        }
      } catch (refreshError) {
        // Handle errors that may occur during the refresh process
        //console.error('Error refreshing token:', refreshError);
      } finally {
        refresh = false;
      }
    }
    return Promise.reject(error);
  }
);

export default client; // Export the Axios client with interceptors
