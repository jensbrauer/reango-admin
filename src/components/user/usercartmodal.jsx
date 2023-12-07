import {useEffect, useState} from "react";
import client from '../../interceptor/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubmitProduct } from './submitproduct';
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


function UserCartModal(props) {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState('');
  useEffect(() => {
    if (show) {
        
     if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/reango-frontend/login'
    }
    else{
     (async () => {
       try {
         const {data} = await client.get(   
                        'mycart/', {
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
    }
  }, [show]);

  const handleClose = () => {setShow(false);setItems('')};
  const handleShow = () => {setShow(true); };
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
      <i class="fa-solid fa-cart-shopping"></i>
      </Button>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-cart-shopping"></i> Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
                        <Row xs={1} md={2} lg={3} className="g-4">
                        {items ? (
                            items.map((item, id) => (
                                <Col key={id}>
                                <Card>
                                    <Ratio key={'1x1'} aspectRatio={'1x1'}>
                                        <div className="prodimg_upload" style={{ backgroundImage: `url(${item.product_img})` }} />
                                    </Ratio>
                                    {/* <Card.Img variant="top" src={item.product_img} /> */}
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
                              <div className="spinner-container"><Spinner animation="grow" /></div>
                            )}
                        </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserCartModal;
