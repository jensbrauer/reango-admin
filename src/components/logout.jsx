import { useEffect } from "react";
import client from '../interceptor/axios';

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

        const { data } = await client.post(
          'logout/',
          requestData,
          {
            headers,
            withCredentials: true
          }
        );

        localStorage.clear();
        window.location.href = '/reango-frontend';
      } catch (e) {
        console.log('logout not working', e);
        window.location.href = '/reango-frontend#/login';
      }
    })();
  }, []);

  return (
    <div>
      <h1>SIGNING OUT</h1>
    </div>
  );
};

