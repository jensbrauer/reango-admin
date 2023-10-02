import React, { Component } from "react";
import axios from 'axios'

export default class Page2 extends Component {

    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('https://reango-48565de87753.herokuapp.com/createproduct/').then(res => {
            data = res.data;
            this.setState({
                details: data
            })
        }).catch(err => {})
    }
    render() {
        return (
            <div>
                {
                    this.state.details.map((products, id) => (
                        <div key={id}>
                            <h1>{products.name}</h1>
                            <h2>{products.brand}</h2>
                        </div>
                    ))
                }
            </div>
        )
    }
}
