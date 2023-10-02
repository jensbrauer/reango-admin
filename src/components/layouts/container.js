import React from "react"
import { NavLink, Outlet } from "react-router-dom"


export default function container() {
    return(
        <div className="container">
            <header>
                <h1>SECOND HAND</h1>
                <NavLink to="/reango-frontend/">STORE</NavLink>
                <NavLink to="/reango-frontend/Page1">MARKETPLACE</NavLink>
                <NavLink to="/reango-frontend/Page2">YOU</NavLink>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}