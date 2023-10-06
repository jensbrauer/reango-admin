import React, { useState, useEffect}  from "react"
import { NavLink, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Container() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);
    return(
        <div>
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">SECOND HAND</Navbar.Brand>            
                    <Nav className="me-auto"> 
                    {isAuth ? <Nav.Link href="/reango-frontend/Page2">YOU</Nav.Link> : null}
                    </Nav>
                    <Nav>
                    {isAuth ? <Nav.Link href="/reango-frontend/logout">Logout</Nav.Link> :  
                                <Nav.Link href="/reango-frontend/login">Login</Nav.Link>}
                    </Nav>
                </Navbar>
            <div className="container">
                    
                <header>
                    <NavLink to="/reango-frontend/">STORE</NavLink>
                    <NavLink to="/reango-frontend/Page1">MARKETPLACE</NavLink>
                    <NavLink to="/reango-frontend/Page2">YOU</NavLink>
                    <NavLink to="/reango-frontend/createproduct">Create Product</NavLink>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}