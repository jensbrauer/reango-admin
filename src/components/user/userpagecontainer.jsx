// Import the react JS packages
import React, { useState, useEffect}  from "react"
import { NavLink, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserPageSell } from "./userpagesell";
import Button from 'react-bootstrap/Button';

import { UploadProduct } from './uploadproduct'
import { UserForSale } from './userforsale'

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


// Define the Login function.
export const UserPage = (props) => {
    const [page, setPage] = useState(<UserForSale />);
    const [activePage, setActivePage] = useState('forsale')
    function reload() {
        setPage(<UserForSale />)
    }

    function setActive(clickedPage) {
        if (clickedPage === 'forsale') {
        setPage(<UserForSale />);
        setActivePage(clickedPage)
    } else if (clickedPage === 'upload'){
        setPage(<UploadProduct returnFunction={reload}/>)
        setActivePage(clickedPage)
    }
}
     return (
        <div className="page">
            <div className="second-tier">
                <Row className="second-nav">
                    <Col>
                        <button className="userpage-nav" style={{
                                        backgroundColor: activePage === 'forsale' ? '#212529' : 'white',
                                        color: activePage === 'forsale' ? 'white' : '#212529',
                                        }}
                                onClick={() => setActive('forsale')}><h4>For Sale</h4></button>
                    </Col>
                    <Col>
                        <button className="userpage-nav" style={{
                                        backgroundColor: activePage === 'upload' ? '#212529' : 'white',
                                        color: activePage === 'upload' ? 'white' : '#212529',
                                        }}
                                onClick={() => setActive('upload')}><h4>Upload new</h4></button>
                    </Col>
                </Row>
                <Row style={{backgroundColor: '#212529',}}>
                    
                    {page}
                </Row>
            </div>
        </div>
        )
}