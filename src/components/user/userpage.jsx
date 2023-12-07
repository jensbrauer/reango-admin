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
import { UserForSale } from "./userforsale";
import UploadModal from './uploadmodal'

export const UserHome = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        /* console.log(localStorage.getItem('access_token'))
        console.log(localStorage.getItem('refresh_token')) */
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/reango-frontend/login'
        }
        else{
         (async () => {
           try {
             const {data} = await client.get(   
                            'user_home/', {
                             headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                             },
                             withCredentials: true
                           }
                           );
             setItems(data);
             //const products = data
             /* console.log('RETRY REQUEST')
             console.log(`Bearer ${localStorage.getItem('access_token')}`) */
          } catch (e) {
            console.log('not auth')
            console.log(e)
          }
         })()};
     }, []);

    return (
        
            <div className="news-feed">
                {items === 'spinner' ? <div className="spinner-container"><Spinner animation="grow" /></div> : 
                <div>
                <h2>Name: {items.username}
                    
                </h2>
                    <Ratio key={'1x1'} aspectRatio={'1x1'}>
                        <div className="prodimg_upload" style={{ backgroundImage: `url(${items.profile_pic})` }}>                            
                        </div>
                    </Ratio>
                </div>}
                <hr></hr>
                <UserForSale />
            </div>
    );
};
