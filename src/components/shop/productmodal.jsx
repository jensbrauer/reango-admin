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


import { LikeProduct, CartProduct } from "../buttons/likeproduct";

function ProductModal(props) {
  const { isAuth_status } = props;
  const { product_detail } = props;
  const { slug } = props;
  const { name } = props
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState(null)


  
  const [carted, setCarted] = useState([])

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
    // Make an API call when the modal is shown
    /* fetchProductDetails(); */
  };

  useEffect(() => {
    if (show) {
      
      fetchProductDetails();
    }
  }, [show]);

  const fetchProductDetails = async () => {
    try {
        const requestData = {
            params : {
          product_slug: slug,
        }};
        const {data} = await client.get(   
                       'product_details/', requestData, {
                        headers: {
                           'Content-Type': 'application/json',
                           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        withCredentials: true
                      }
                      );
                      setProductData(data);
     } catch (e) {
       console.log('not auth')
       console.log(e)
     }
  };
  
  function handleCart(slug) {
    if (isAuth_status) {
      CartProduct(slug);
    
      if (carted.includes(slug)) {
        setCarted(carted.filter((item) => item !== slug));
      } else {
        setCarted([...carted, slug]);
      }
    }
  }

  return (
    <>
    
      <Ratio key={'1x1'} aspectRatio={'1x1'}>
        <div  onClick={handleShow} className="prodimg_upload" style={{ backgroundImage: `url(${name})` }}> 
                                   
        </div>
      </Ratio>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product_detail.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {productData ? 
        
        <div>
          <Row className='img-placer'>
            <Col>
            <Image className="prod-img-fullsize" src={productData.product_img} fluid />
            </Col>
            
            <Button variant="light" style={{color: carted.includes(product_detail.slug) ? product_detail.is_carted === 'yes' ? '#495057' : '#0d6efd' : product_detail.is_carted === 'yes' ? '#0d6efd' : '#495057'}} onClick={() => handleCart(product_detail.slug)}>
                add {product_detail.name} to shoppingcart <i class="fa-solid fa-cart-shopping"></i>
              </Button>
              {/* <FollowButton username={product_detail.uploaded_by} followed={true} /> */}
          </Row>
          <Row>
            <h5>Name: {productData.name}</h5>
            <h5>Price: {productData.prize}</h5>
            <h5>Sold by: {productData.uploaded_by}</h5>
            <h5>Condition: {productData.condition}</h5>
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

export default ProductModal;