import React, { useState, useEffect}  from "react"
import { NavLink, Outlet } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from "react-router-dom";
import Homepage from '../homepage';
import Shop from '../shop/shop';
import { UserPage } from '../user/userpagecontainer';
import { Logout } from '../logout';
import { Login } from "../login";
import { CreateProduct } from "../createproduct";


export default function Container() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);
    return(
        <div>
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/reango-frontend">SUPER STORE</Navbar.Brand>            
                    <Nav className="me-auto"> 
                    {isAuth ? <NavLink to="/you">YOU</NavLink> : null}
                    </Nav>            
                    <Nav className="me-auto"> 
                        <NavLink to="/shop">MARKETPLACE</NavLink>
                    </Nav>
                    <Nav>
                    {isAuth ? <NavLink to="/logout">Logout</NavLink> :  
                                <NavLink to="/login">Login</NavLink>}
                    </Nav>
                </Navbar>
            <div className="container">
                    
                
                <main>
                    <Routes>
                        <Route path="/" element={ <Homepage /> } />
                        <Route path="/shop" element={ <Shop /> } />
                        <Route path="/login" element={ <Login/> } />
                        <Route path="/logout" element={ <Logout/> } />
                        <Route path="/createproduct" element={ <CreateProduct/> } />
                        <Route path="/you" element={ <UserPage/> } />
                    </Routes>
                </main>
            </div>
        </div>
    )
}