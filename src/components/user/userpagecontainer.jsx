// Import the react JS packages
import React, { useState, useEffect}  from "react"
import { NavLink, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserPageSell } from "./userpagesell";
import Button from 'react-bootstrap/Button';
import { UserPageShop } from "./userpageshop";

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


// Define the Login function.
export const UserPage = (props) => {
    const [page, setPage] = useState('Something');

     return (
        <div>
            <Row>
                <Col>
                
            <Button onClick={() => setPage(<UserPageShop />)}>SHOP</Button>
            </Col>
            <Col>
            <Button onClick={() => setPage(<UserPageSell />)}>SELL</Button>
            </Col>
            </Row>
            <main>
                {page}
            </main>
        </div>
        )
}