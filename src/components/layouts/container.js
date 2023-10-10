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
                <Navbar.Brand href="/reango-frontend">SECOND HAND</Navbar.Brand>            
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
                    <div className="row">
                        <div className="col-6 shopping-place-left">
                            <NavLink to="/reango-frontend/shoppingplace">STORE</NavLink>
                        </div>
                        <div className="col-6 shopping-place-right">
                            <NavLink to="/reango-frontend/Page2">MARKETPLACE</NavLink>
                        </div>  
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}