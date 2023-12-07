import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import client from '../interceptor/axios';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function FollowButton(props) {
    const { username } = props;
    const { followed } = props

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    console.log(username)
    console.log(followed)

  
    
    const FollowProfile = async (profileUsername) => {
        try {
            const requestData = {
            refresh_token: localStorage.getItem('refresh_token'),
            username: profileUsername
            };

            const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
            };

            console.log('Request Data:', requestData);
            console.log('Headers:', headers);

            const { data } = await client.post(
            'follow/',
            requestData,
            {
                headers,
                withCredentials: true
            }
            );

        //localStorage.clear();
        //window.location.href = '/reango-frontend/you';
    } catch (e) {
        //window.location.href = '/reango-frontend/you';
        console.log('logout not working', e);
        window.location.href = '/reango-frontend/login';
    }
}
const handleClick = () => {
    if (isAuth) {
      FollowProfile(username);
    }
  }
  

  return (
    <Button onClick={handleClick}>Follow {username}</Button>
  )
}

export default FollowButton;