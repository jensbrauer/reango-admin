import React, { useEffect, useState } from "react";
import client from '../../interceptor/axios';
import { LikeProduct, CartProduct } from "../buttons/likeproduct";
import Ratio from 'react-bootstrap/Ratio';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ProductModal from "./productmodal";
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';

import { GenderFilter, BrandFilter, PrizeFilter } from "./shopfilters";
import { useNavigate } from 'react-router-dom';
import ToProfile from "../buttons/toprofile";
import DisplayProductList from "../layouts/displayproductlist";

import '../../index.css'

function Shop() {
  
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    const [details, setDetails] = useState([]);
    const [user_type, setUserType] = useState(['STORE',]);
    const [gender, setGender] = useState([]);
    const [brand, setBrand] = useState([]);
    const [prizeMax, setPrizeMax] = useState([]);
    const [prizeMin, setPrizeMin] = useState([]);
    const [showFilter, setShowFilter] = useState(null);
    const [liked, setLiked] = useState([])
    const [carted, setCarted] = useState([])


    const SelectFilter = (filterComponent) => {
        if (showFilter === filterComponent) {
          setShowFilter(null); // Toggle off if same component is reselected
        } else {
          setShowFilter(filterComponent); // Set to the new component if different
        }

    }
    const navigate = useNavigate()

    const handleNavigate = (proposition) => {
        navigate('/profilepage', { state: { slug: proposition } })
    }

    useEffect(() => {
        // This effect runs when the component mounts or when `user_type` changes
        setDetails('spinner')
        const queryParams = [
            ''.concat('user_type=', user_type.join('&user_type=')),
            ''.concat('gender=', gender.join('&gender=')),
            ''.concat('brand=', brand.join('&brand=')),
            ''.concat('prize_min=', prizeMin),
            ''.concat('prize_max=', prizeMax),
    ]

        const queryString = queryParams.join('&')
        if (localStorage.getItem('access_token') !== null) {
          client.get(`/createproduct/?${queryString}`, {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            withCredentials: true
          }).then((res) => {
              setDetails(res.data);
          }).catch((err) => {
              // Handle errors
          });
        } else {
          client.get(`/createproduct/?${queryString}`, {
            headers: {
               'Content-Type': 'application/json'
            }
          }).then((res) => {
              setDetails(res.data);
          }).catch((err) => {
              // Handle errors
          });
        }
    }, [user_type, gender, brand, prizeMin, prizeMax]); // Include user_type in the dependency array

    const [showStore, setShowStore] = useState(true)
    const [showFeatured, setShowFeatured] = useState(false)
    const [showUser, setShowUser] = useState(false)
/*     const toggleStoreDisplay = () => {
        setShowStore(!showStore)
    } */
    
    function addFilter(param, setParam, filterValue) {
        if (filterValue === 'STORE'){
            setShowStore(!showStore)
        } else if (filterValue === 'USER'){
            setShowUser(!showUser)
        } else if (filterValue === 'FEATURED'){
            setShowFeatured(!showFeatured)
        }
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

    function handleLike(slug) {
      if (isAuth) {
        LikeProduct(slug);
      
        if (liked.includes(slug)) {
          setLiked(liked.filter((item) => item !== slug));
        } else {
          setLiked([...liked, slug]);
        }
      }
    }


    function handleCart(slug) {
      if (isAuth) {
        CartProduct(slug);
      
        if (carted.includes(slug)) {
          setCarted(carted.filter((item) => item !== slug));
        } else {
          setCarted([...carted, slug]);
        }
      }
    }

    return (
        <div className="store">



                <Row className="">
                  
              
                  <Accordion as="div">
                    <Accordion.Item as="div" eventKey="0">
                      <Accordion.Header><h4>FILTER</h4></Accordion.Header>
                      <Accordion.Body>
                        
                    <Row>
                      <Col>
                      
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header><h5>Price</h5></Accordion.Header>
                        <Accordion.Body>
                        <PrizeFilter returnFunction={prizeParamSet}/>
                        </Accordion.Body>
                      </Accordion.Item>  
                    </Accordion>
                      </Col>
                    </Row>

                  <Row>
                    <Col>
                    <Accordion className="accordion">
                      <Accordion.Item className="accordion-item" eventKey="0">
                        <Accordion.Header className="accordion-header"><h5>Gender</h5></Accordion.Header>
                        <Accordion.Body className="accordion-body">
                        <Button className="filter-button" variant={ gender.includes(0) ? 'light' : 'dark'} onClick={() => genderParamSet(0)}>Male</Button>
                        <Button className="filter-button" variant={ gender.includes(1) ? 'light' : 'dark'} onClick={() => genderParamSet(1)}>Female</Button>
                        <Button className="filter-button" variant={ gender.includes(2) ? 'light' : 'dark'} onClick={() => genderParamSet(2)}>Unisex</Button>
                        </Accordion.Body>
                      </Accordion.Item>  
                    </Accordion>
                    </Col>

                    <Col>
                    <Accordion className="accordion">
                      <Accordion.Item className="accordion-item" eventKey="0">
                        <Accordion.Header className="accordion-header"><h5>Brand</h5></Accordion.Header>
                        <Accordion.Body className="accordion-body">
                          <Button className="filter-button" variant={ brand.includes(0) ? 'light' : 'dark'} onClick={() => brandParamSet(0)}>Other</Button>
                          <Button className="filter-button" variant={ brand.includes(1) ? 'light' : 'dark'} onClick={() => brandParamSet(1)}>Nike</Button>
                          <Button className="filter-button" variant={ brand.includes(2) ? 'light' : 'dark'} onClick={() => brandParamSet(2)}>Adidas</Button>
                          <Button className="filter-button" variant={ brand.includes(3) ? 'light' : 'dark'} onClick={() => brandParamSet(3)}>GUCCI</Button>
                        </Accordion.Body>
                      </Accordion.Item>  
                    </Accordion>
                    </Col>


                  </Row>
                      </Accordion.Body>
                    </Accordion.Item>  
                  </Accordion>


                </Row>
                <Row className="second-nav">
        <Col>
          <button
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              filter: showStore ? "grayscale(20%)" : "grayscale(80%)",
            }}
            onClick={() => addFilter(user_type, setUserType, 'STORE')}
          >
            <h5>store</h5>
          </button>
        </Col>
        <Col>
          <button
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              filter: showFeatured ? "grayscale(20%)" : "grayscale(80%)",
            }}
            onClick={() => addFilter(user_type, setUserType, 'FEATURED')}
          >
            <h5>influencers</h5>
          </button>
        </Col>
        <Col>
          <button
            style={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              filter: showUser ? "grayscale(20%)" : "grayscale(80%)",
            }}
            onClick={() => addFilter(user_type, setUserType, 'USER')}
          >
            <h5>marketplace</h5>
          </button>
        </Col>
      </Row>
            
                <Row>
                {details === 'spinner' ? <div className="spinner-container"><Spinner animation="grow" /></div>  :
                <DisplayProductList products={details} like_included={true} />}
                </Row>
        </div>
    );
}

export default Shop;
