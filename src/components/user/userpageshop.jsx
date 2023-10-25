// Import the react JS packages
import React, { useState, useEffect}  from "react"
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import client from '../../interceptor/axios';


// Define the Login function.
export const UserPageShop = (props) => {

    const [items, setItems] = useState('');
    useEffect(() => {
       if(localStorage.getItem('access_token') === null){                   
           window.location.href = '/reango-frontend/login'
       }
       else{
        (async () => {
          try {
            const {data} = await client.get(   
                           'myliked/', {
                            headers: {
                               'Content-Type': 'application/json',
                               Authorization: `Bearer ${localStorage.getItem('access_token')}`
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
            <Accordion defaultActiveKey="0">
                
            <Accordion.Item eventKey="0">
                    <Accordion.Header><h4>Liked Stuff</h4></Accordion.Header>
                    <Accordion.Body>
                        <p>Henlo fwend</p>
                        <Row xs={1} md={2} lg={3} className="g-4">
                        {items ? (
                            items.map((item, id) => (
                                <Col key={id}>
                                <Card>
                                    <Card.Img variant="top" src={item.product_img} />
                                    <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.brand}{item.name}{item.slug}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))
                            ) : (
                            <div>Loading</div>
                            )}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header><h4>Shoppingcart</h4></Accordion.Header>
                    <Accordion.Body>
                        <p>Henlo fwendlier</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
        )
}