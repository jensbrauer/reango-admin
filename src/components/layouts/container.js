import React, { useState, useEffect}  from "react"
import { NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from "react-router-dom";
import { Homepage } from '../homepage';
import Shop from '../shop/shop';
import { UserPage } from '../user/userpagecontainer';
import { Logout } from '../logout';
import { Login } from "../login";
import Button from "react-bootstrap/esm/Button";
import UserCartModal from "../user/usercartmodal";
import UserLikedModal from "../user/userlikedmodal";
import Container from 'react-bootstrap/Container';
import { ProfilePage } from '../profile/profilepage';
import { UserHome } from '../user/userpage';



export default function PageContainer() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    return(
        <div>
                <Navbar expand="lg" bg="white" variant="light" fixed="top">
                    <Container>
                <Navbar.Brand href="/reango-frontend"> <h1>H</h1> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="me-auto"> 
                            <NavLink className="nav-link" to="/shop">STORE</NavLink>
                        {isAuth ? <UserLikedModal /> : null}
                        {isAuth ? <UserCartModal /> : null}
                        </Nav>
                        <Nav>
                        {isAuth ? <NavLink className="nav-link" to="/you"><i class="fa-solid fa-user"></i></NavLink> : null}
                        {isAuth ? <NavLink className="nav-link" to="/logout">Logout</NavLink> :  
                                    <NavLink className="nav-link" to="/login">Login</NavLink>}
                                    
                        </Nav>
                    
                    </Navbar.Collapse>
                    </Container>  
                </Navbar>
            <div className="content-container">
                    
                <main>
                    <Routes>
                        <Route path="/" element={ <Homepage /> } />s
                        <Route path="/shop" element={ <Shop /> } />
                        <Route path="/login" element={ <Login/> } />
                        <Route path="/logout" element={ <Logout/> } />
                        {/* <Route path="/you" element={ <UserPage/> } /> */}
                        <Route path="/profilepage" element={ <ProfilePage/> } />
                        <Route path="/you" element={ <UserHome/> } />
                    </Routes>
                </main>
            </div>
        </div>
    )
}