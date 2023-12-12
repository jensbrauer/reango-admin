import React, { useEffect, useState } from "react";
import moment from 'moment';
import client from '../../interceptor/axios';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import FollowButton from '../buttons/followbutton';
import ProfileProductList from "./profileproductlist";

export const ProfilePage = () => {
    const location = useLocation();
    const profile_username = location.state && location.state.username;

    const [items, setItems] = useState('spinner');
    console.log(profile_username)
    useEffect(() => {
       
        setItems('spinner')
       if(localStorage.getItem('access_token') === null){                   
           window.location.href = '/reango-frontend#/login'
       }
       else{
        (async () => {
          try {
            const requestData = {
                params : {
              username: profile_username,
            }};
            const {data} = await client.get(   
                           'profile/', requestData, {
                            headers: {
                               'Content-Type': 'application/json',
                               Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                            },
                            withCredentials: true
                          }
                          );
            setItems(data);
         } catch (e) {
           console.log('not auth')
           console.log(e)
         }
        })()};
    }, []);
    console.log(profile_username)
    return (
        
            <div className="news-feed">
                {items === 'spinner' ? <div className="spinner-container"><Spinner animation="grow" /></div> : 
                <div>
                    <Row>
                        <Col>
                            <h2>{items.username}</h2>
                        </Col>
                        <Col className="text-right">
                            <FollowButton username={items.username} followed={true} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Ratio key={'1x1'} aspectRatio={'1x1'}>
                                <div className="prodimg_upload profile-page-pic" style={{ backgroundImage: `url(${items.profile_pic})` }}>                            
                                </div>
                            </Ratio>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>}
                <hr></hr>
                <h2>For sale</h2>
                {items === 'spinner' ?  <div className="spinner-container"><Spinner animation="grow" /></div> : <ProfileProductList profile_username={profile_username}/>}
                
            </div>
    );
};
