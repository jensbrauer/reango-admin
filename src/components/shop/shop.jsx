import React, { useEffect, useState } from "react";
import client from '../../interceptor/axios';
import { LikeProduct, CartProduct } from "./likeproduct";

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ProductModal from "./productmodal";

import { GenderFilter, BrandFilter, PrizeFilter } from "./shopfilters";

import '../../index.css'

function Shop() {
    const [details, setDetails] = useState([]);
    const [user_type, setUserType] = useState([]);
    const [gender, setGender] = useState([]);
    const [brand, setBrand] = useState([]);
    const [prizeMax, setPrizeMax] = useState([]);
    const [prizeMin, setPrizeMin] = useState([]);
    const [showFilter, setShowFilter] = useState(null);


    const SelectFilter = (filterComponent) => {
        if (showFilter === filterComponent) {
          setShowFilter(null); // Toggle off if same component is reselected
        } else {
          setShowFilter(filterComponent); // Set to the new component if different
        }

    }

    useEffect(() => {
        // This effect runs when the component mounts or when `user_type` changes
        const queryParams = [
            ''.concat('user_type=', user_type.join('&user_type=')),
            ''.concat('gender=', gender.join('&gender=')),
            ''.concat('brand=', brand.join('&brand=')),
            ''.concat('prize_min=', prizeMin),
            ''.concat('prize_max=', prizeMax),
    ]

        const queryString = queryParams.join('&')
        //console.log(queryString)
        //console.log(client)
        client.get(`/createproduct/?${queryString}`).then((res) => {
            setDetails(res.data);
        }).catch((err) => {
            // Handle errors
        });
    }, [user_type, gender, brand, prizeMin, prizeMax]); // Include user_type in the dependency array


    
    function addFilter(param, setParam, filterValue) {
      if (!param.includes(filterValue)) {
        const newFilterBundle = [...param, filterValue];
        setParam(newFilterBundle)
      } else {
        const newFilterBundle = param.filter(item => item !== filterValue);
        setParam(newFilterBundle)
      }
    }

    function genderParamSet(value) {addFilter(gender, setGender, value)}
    function brandParamSet(value) {addFilter(brand, setBrand, value)}
    function prizeParamSet(value) {setPrizeMin(value.prize_min); setPrizeMax(value.prize_max)}

    return (
        <div>
            <Row className="shop-select" >
                <Col>
                    <button onClick={() => addFilter(user_type, setUserType, 'STORE')}>STORE</button>
                </Col>
                <Col>
                    <button onClick={() => addFilter(user_type, setUserType, 'FEATURED')}>FEATURED</button>
                </Col>
                <Col>
                    <button onClick={() => addFilter(user_type, setUserType, 'USER')}>MARKETPLACE</button>
                </Col>
            </Row>
            <div className="store-content">
                <Row className="shop-select" >
                    <Col>
                        <button onClick={() => SelectFilter('Gender')}>Gender</button>
                    </Col>
                    <Col>
                        <button onClick={() => SelectFilter('Brand')}>Brand</button>
                    </Col>
                    <Col>
                        <button onClick={() => SelectFilter('Prize')}>Price</button>
                    </Col>
                </Row>
                <Row className="filter-display">
                {showFilter === "Gender" && <GenderFilter returnFunction={genderParamSet}/>}
                {showFilter === "Brand" && <BrandFilter returnFunction={brandParamSet}/>}
                {showFilter === "Prize" && <PrizeFilter returnFunction={prizeParamSet}/>}

                </Row>

                <Row xs={1} md={2} lg={3} className="g-4">
                    {details.map((product, id) => (
                        <Col key={id}>
                            <Card>
                                <Card.Img variant="top" src={product.product_img} />
                                <Card.Body>
                                    <Card.Title>
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text>
                                        {product.brand}
                                        <Button variant="dark" onClick={() => LikeProduct(product.slug)}>Like</Button>
                                        <Button variant="danger" onClick={() => CartProduct(product.slug)}>Cart</Button>
                                        <ProductModal name={product.name} slug={product.slug} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Shop;
