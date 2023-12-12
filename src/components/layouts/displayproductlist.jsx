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
import ToProfile from '../buttons/toprofile'
import LikeButton from '../buttons/likebutton';



function DisplayProductList(props) {
    const { products } = props;
    const { like_included } = props;

  return (
    <Row id="product-list" xs={1} md={2} lg={4} className="g-4">
                        
                    {products ? (
                        products.map((product, id) => (
                            <Col className='product-card-col' key={id}>
                                <Card className='display-product-card' bg="white" text="dark">
                                    <ShowProductModal product={product}/>
                                    <Card.Body className='display-product-card-body'>
                                    <Card.Title>
                                        <h5>
                                            {like_included ? <LikeButton is_liked={product.is_liked} slug={product.slug}/> : ''}
                                            {product.name}
                                        </h5>
                                    </Card.Title>
                                    <Card.Text>
                                        {product.prize} SEK from
                                        <ToProfile slug={product.profile_slug} username={product.uploaded_by} />
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

export default DisplayProductList;

