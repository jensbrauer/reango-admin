
import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';


function ToProfile(props) {
    const { username } = props;
    const { slug } = props;
    const navigate = useNavigate()

    const handleNavigate = (proposition) => {
        console.log(proposition)
        navigate('/profilepage', { state: { username: proposition } })
    }


  return (
    <Button id="to-profile-nav" onClick={() => handleNavigate(username)}>{username}</Button>
  )
}

export default ToProfile;