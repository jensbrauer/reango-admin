import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import client from '../../interceptor/axios';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FollowButton from '../buttons/followbutton';
import CartButton from './cartbutton';


import { LikeProduct, CartProduct } from "../buttons/likeproduct";

function ShowProductModal(props) {
  const { product } = props;
  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
    // Make an API call when the modal is shown
    /* fetchProductDetails(); */
  };


  

  return (
    <>
    
      <Ratio key={'1x1'} aspectRatio={'1x1'}>
        <div  onClick={handleShow} className="prodimg_upload" style={{ backgroundImage: `url(${product.product_img})` }}> 
                                   
        </div>
      </Ratio>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {product ? 
        
        <div>
          <Row className='img-placer'>
            <Col>
            <Image className="prod-img-fullsize" src={product.product_img} fluid />
            </Col>
            
            {/* <Button variant="light" style={{color: carted.includes(product.slug) ? product.is_carted === 'yes' ? '#495057' : '#0d6efd' : product.is_carted === 'yes' ? '#0d6efd' : '#495057'}} onClick={() => handleCart(product.slug)}>
                add {product.name} to shoppingcart <i class="fa-solid fa-cart-shopping"></i>
              </Button> */}
              <FollowButton username={product.uploaded_by} followed={true} />
              <CartButton is_carted={product.is_carted} slug={product.slug}/>
          </Row>
          <Row>
            <h5>Name: {product.name}</h5>
            <h5>Price: {product.prize}</h5>
            <h5>Sold by: {product.uploaded_by}</h5>
            <h5>Condition: {product.condition}</h5>
          </Row>
        </div> :
        <div className="spinner-container"><Spinner animation="grow" /></div>
        }
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

export default ShowProductModal;