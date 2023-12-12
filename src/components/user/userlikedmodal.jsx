import {useEffect, useState} from "react";
import client from '../../interceptor/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubmitProduct } from './submitproduct';
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';
import DisplayProductList from "../layouts/displayproductlist";

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


function UserLikedModal(props) {
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
    }
  }, [show]);

  const handleClose = () => {setShow(false);setItems('')};
  const handleShow = () => {setShow(true); };
  return (
    <>
      <Button variant="white" onClick={handleShow}>
      <i class="fa-regular fa-heart"></i>
      </Button>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h4><i class="fa-regular fa-heart"></i> Liked </h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
                        <DisplayProductList products={items} like_included={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="general-button" variant="white" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserLikedModal;
