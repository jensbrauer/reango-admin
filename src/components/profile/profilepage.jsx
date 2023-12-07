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
import FollowButton from '../followbutton';
import ProfileProductList from "./profileproductlist";

export const ProfilePage = () => {
    const location = useLocation();
    const profile_slug = location.state && location.state.slug;

    const [items, setItems] = useState([]);

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
              slug: profile_slug,
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
    console.log(profile_slug)
    return (
        
            <div className="news-feed">
                {items === 'spinner' ? <div className="spinner-container"><Spinner animation="grow" /></div> : 
                <div>
                <h2>Name: {items.username}
                    <FollowButton username={items.username} followed={true} />
                </h2>
                    <Ratio key={'1x1'} aspectRatio={'1x1'}>
                        <div className="prodimg_upload" style={{ backgroundImage: `url(${items.profile_pic})` }}>                            
                        </div>
                    </Ratio>
                </div>}
                <hr></hr>
                <h1>For sale:</h1>
                <ProfileProductList profile_slug={profile_slug}/>
            </div>
    );
};
