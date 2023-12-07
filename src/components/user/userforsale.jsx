// Import the react JS packages
import {useEffect, useState} from "react";
import client from '../../interceptor/axios';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ProductModal from "../shop/productmodal";
import Ratio from 'react-bootstrap/Ratio';
import UploadModal from './uploadmodal'



// Define the Login function.
export const UserForSale = () => {
     const [items, setItems] = useState('');

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
                            'you/', {
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
                    <Row id="product-list" xs={1} md={2} lg={3} className="g-4">
                        <Col>
                            <Card bg="dark" text="light">
                                {/* <Ratio key={'1x1'} aspectRatio={'1x1'}>
                                    <div className="prodimg_upload" style={{ backgroundColor: `black` }} />
                                </Ratio> */}
                                {/* <Card.Img variant="top" src={item.product_img} /> */}
                                <Card.Body>
                                <Card.Title>
                                
                                    <UploadModal/>
                                </Card.Title>
                                <Card.Text>
                                    Upload some new stuff for sale
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
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
                        <div>Loading</div>
                        )}
                    </Row>
        )
}