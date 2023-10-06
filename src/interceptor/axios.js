import axios from "axios";
let refresh = false;

axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
        console.log("Handling 401 Unauthorized Error");
  
        // Log the current refresh token from localStorage
        console.log('Refresh Token:', localStorage.getItem('refresh_token'));
  
        const response = await axios.post(
          'http://127.0.0.1:8000/token/refresh/',
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
          console.log('New Access Token:', response.data['access']);
  
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
  
          // Log the updated request configuration
          console.log('Updated Request Config:', error.config);
  
          return axios(error.config);
        }
      }
      refresh = false;
      return error;
    }
  );
  
  export default axios