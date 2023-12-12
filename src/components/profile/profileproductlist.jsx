import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import client from '../../interceptor/axios'
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';
import ShowProductModal from "../buttons/showproductmodal";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import ProductModal from '../shop/productmodal';
import DisplayProductList from '../layouts/displayproductlist';



function ProfileProductList(props) {
    const { profile_username } = props;

    const [isAuth, setIsAuth] = useState(false);
    const [items, setItems] = useState('');

    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    
    useEffect(() => {
        /* console.log(localStorage.getItem('access_token'))
        console.log(localStorage.getItem('refresh_token')) */
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/reango-frontend/login'
        }
        else{
         (async () => {
            try {
                const requestData = {
                    params : {
                  username: profile_username,
                }};
                const {data} = await client.get(   
                               'product_list/', requestData, {
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

  return (
    <div>
        <DisplayProductList products={items} like_included={true} />
    </div>
  )
}

export default ProfileProductList;