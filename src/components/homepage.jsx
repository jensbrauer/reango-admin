import React, { Component } from "react";
import Image from 'react-bootstrap/Image'
import Hero from '../static/images/kindpng_1196166.png'
import '../index.css'


import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom"

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="hero-image row">
            <div className=" col-6 hero-left">
                <h4 className="hero-text-left">Goggles 70%</h4>
            </div>
            <div className="col-6 hero-right">
                <h4 className="hero-text-right">View SALE</h4>
            </div>
        </div>
    }
}
