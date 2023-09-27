import React, { Component } from "react";

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom"

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1> Homepage is working </h1>;
    }
}
