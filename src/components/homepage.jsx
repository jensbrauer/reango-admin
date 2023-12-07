import React, { useEffect, useState } from "react";
import moment from 'moment';
import client from '../interceptor/axios';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from 'react-router-dom';
import FollowButton from './followbutton';
import Button from 'react-bootstrap/Button';
import ProductModal from "../components/shop/productmodal";

export const Homepage = () => {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate()

    const handleNavigate = (proposition) => {
        navigate('/profilepage', { state: { slug: proposition } })
    }

    useEffect(() => {
        setDetails('spinner')
        // Your API call logic remains unchanged
        const fetchData = async () => {
            try {
                const response = await client.get(`/news`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`
                    },
                    withCredentials: true
                });

                const sortedDetails = response.data.sort((a, b) => {
                    const dateA = moment(a.uploaded, 'YYYY-MM-DD');
                    const dateB = moment(b.uploaded, 'YYYY-MM-DD');
                    return dateB - dateA;  // Sorting in descending order, adjust if needed
                });

                setDetails(sortedDetails);
            } catch (error) {
                // Handle errors
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        
            <div className="news-feed">
                <h2>Whats New?</h2>
                <hr/>
                {details === 'spinner' ? <div className="spinner-container"><Spinner animation="grow" /></div>  : 
                <Row xs={1} className="g-4">
                    {details.map((product, id) => (
                        
                        <Col key={id}>
                            
                            <Card>
                                <Card.Body>
                                    {/* <Card.Title></Card.Title> */}
                                    <Card.Text>
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                <div className="profile-pic-news" style={{ backgroundImage: `url(${product.profile_pic})` }} />
                                                </Col>
                                                    <Col>
                                                <Button variant="dark" onClick={() => handleNavigate(product.profile_slug)}>{product.sold_by}</Button>
                                                </Col>

                                                </Row>
                                                <Row>
                                                    {moment(product.uploaded).format('YYYY-MM-DD')}
                                                </Row>
                                                <hr />
                                                <Row>
                                                    
                                                <h5>{product.name}</h5>
                                                {/* <FollowButton username={product.sold_by} followed={true}/> */}
                                                </Row>
                                            </Col>
                                            <Col>
                                                {/* <div className="product-img-news" style={{ backgroundImage: `url(${product.product_img})` }} /> */}
                                                <Ratio key={'1x1'} aspectRatio={'1x1'}>
                                                    <div className="prodimg_upload" style={{ backgroundImage: `url(${product.product_img})` }} />
                                                </Ratio>
                                                
                                                {/* <ProductModal isAuth_status={isAuth} product_detail={product} name={product.product_img} slug={product.slug} /> */}
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                }
            </div>
    );
};
