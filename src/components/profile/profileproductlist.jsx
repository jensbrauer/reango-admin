import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import client from '../../interceptor/axios'
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';



function ProfileProductList(props) {
    const { profile_slug } = props;

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
                  slug: profile_slug,
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
    <Row id="product-list" xs={1} md={2} lg={3} className="g-4">
                        
                    {items ? (
                        items.map((item, id) => (
                            <Col key={id}>
                            <Card bg="dark" text="light">
                                <Ratio key={'1x1'} aspectRatio={'1x1'}>
                                    <div className="prodimg_upload" style={{ backgroundImage: `url(${item.product_img})` }} />
                                </Ratio>
                                {/* <Card.Img variant="top" src={item.product_img} /> */}
                                <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {/* <ProductModal name={item.name} slug={item.slug} /> */}
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))
                        ) : (
                            <div className="spinner-container"><Spinner animation="grow" /></div>
                        )}
                    </Row>
  )
}

export default ProfileProductList;