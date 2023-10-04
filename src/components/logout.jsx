import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const requestData = {
          refresh_token: localStorage.getItem('refresh_token')
        };

        // Include the access token in the headers
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        };

        console.log('Request Data:', requestData);

        const { data } = await axios.post(
          'http://127.0.0.1:8000/logout/',
          requestData,
          {
            headers,
            withCredentials: true
          }
        );

        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/reango-frontend/login';
      } catch (e) {
        console.log('logout not working', e);
      }
    })();
  }, []);

  return (
    <div></div>
  );
};
