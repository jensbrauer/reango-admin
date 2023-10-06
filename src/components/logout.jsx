import { useEffect } from "react";
import axios from '../interceptor/axios';

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const requestData = {
          refresh_token: localStorage.getItem('refresh_token')
        };

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        };

        console.log('Request Data:', requestData);
        console.log('Headers:', headers);

        const { data } = await axios.post(
          'https://reango-48565de87753.herokuapp.com/logout/',
          requestData,
          {
            headers,
            withCredentials: true
          }
        );

        localStorage.clear();
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

